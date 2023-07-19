use std::{fs, path::Path, process::exit};

use crate::shared::{
    packets::{
        list_packet, packet::Value, ChunkPacket, HandshakePacket, HandshakeResponsePacket,
        ListPacket, Packet, ProgressPacket,
    },
    JsonPacket, JsonPacketResponse, JsonPacketSender, PacketSender, Sender, Socket,
};

use aes_gcm::{aead::Aead, Aes128Gcm, Key};
use base64::{engine::general_purpose, Engine as _};
use futures_util::{future, pin_mut, stream::TryStreamExt, StreamExt};
use hmac::{Hmac, Mac};
use p256::{ecdh::EphemeralSecret, PublicKey};
use prost::Message;
use rand::{rngs::OsRng, RngCore};
use sha2::Sha256;
use tokio::{io::AsyncReadExt, task::JoinHandle};
use tokio_tungstenite::tungstenite::protocol::Message as WebSocketMessage;

const DESTINATION: u8 = 1;
const NONCE_SIZE: usize = 12;
const MAX_CHUNK_SIZE: usize = 65535;
const URL: &str = "https://share.vldr.org/#";

#[derive(Clone)]
struct File {
    path: String,
    name: String,
    size: u64,
}

struct Context {
    hmac: Vec<u8>,
    sender: Sender,

    key: EphemeralSecret,
    files: Vec<File>,

    shared_key: Option<Aes128Gcm>,
    task: Option<JoinHandle<()>>,
}

fn on_create_room(context: &Context, id: String) -> Result<(), String> {
    let base64 = general_purpose::STANDARD.encode(&context.hmac);

    println!("Created room: {}{}-{}", URL, id, base64);

    Ok(())
}

fn on_join_room(context: &Context, size: Option<usize>) -> Result<(), String> {
    if size.is_some() {
        return Err("Invalid join room packet.".into());
    }

    let public_key = context.key.public_key().to_sec1_bytes().into_vec();

    let mut mac = Hmac::<Sha256>::new_from_slice(&context.hmac).unwrap();
    mac.update(&public_key);

    let signature = mac.finalize().into_bytes().to_vec();
    let handshake = HandshakePacket {
        public_key,
        signature,
    };

    context
        .sender
        .send_packet(DESTINATION, Value::Handshake(handshake));

    Ok(())
}

fn on_error(message: String) -> Result<(), String> {
    Err(message)
}

fn on_leave_room(context: &mut Context, _: usize) -> Result<(), String> {
    if let Some(task) = &context.task {
        task.abort();
    }

    context.shared_key = None;
    context.task = None;

    println!();
    println!("Transfer was interrupted because the receiver left.");

    Ok(())
}

fn on_progress(context: &Context, progress: ProgressPacket) -> Result<(), String> {
    let Some(file) = context.files.get(progress.index as usize) else {
        return Err("Invalid index in progress packet.".into());
    };

    print!("\rTransferring '{}': {}%", file.name, progress.progress);

    if progress.progress == 100 {
        println!();

        if progress.index as usize == context.files.len() - 1 {
            exit(0);
        }
    }

    std::io::Write::flush(&mut std::io::stdout()).unwrap();

    Ok(())
}

async fn on_chunk(sender: Sender, shared_key: Option<Aes128Gcm>, files: Vec<File>) {
    for file in files {
        let mut sequence = 0;
        let mut size = file.size as isize;
        let mut chunk_size = MAX_CHUNK_SIZE as isize;

        let mut handle = match tokio::fs::File::open(file.path).await {
            Ok(handle) => handle,
            Err(error) => {
                print!("Error: Unable to open file '{}': {}", file.name, error);
                std::io::Write::flush(&mut std::io::stdout()).unwrap();

                return;
            }
        };

        while size > 0 {
            if size < chunk_size {
                chunk_size = size;
            }

            let mut chunk = vec![0u8; chunk_size.try_into().unwrap()];
            handle.read_exact(&mut chunk).await.unwrap();

            sender.send_encrypted_packet(
                &shared_key,
                DESTINATION,
                Value::Chunk(ChunkPacket { sequence, chunk }),
            );

            size -= chunk_size;
            sequence += 1;
        }
    }
}

fn on_handshake_finalize(context: &mut Context) -> Result<(), String> {
    let mut entries = vec![];

    for (index, file) in context.files.iter().enumerate() {
        let entry = list_packet::Entry {
            index: index.try_into().unwrap(),
            name: file.name.clone(),
            size: file.size,
        };

        entries.push(entry);
    }

    context.sender.send_encrypted_packet(
        &context.shared_key,
        DESTINATION,
        Value::List(ListPacket { entries }),
    );

    context.task = Some(tokio::spawn(on_chunk(
        context.sender.clone(),
        context.shared_key.clone(),
        context.files.clone(),
    )));

    Ok(())
}

fn on_handshake(
    context: &mut Context,
    handshake_response: HandshakeResponsePacket,
) -> Result<(), String> {
    if context.shared_key.is_some() {
        return Err("Already performed handshake.".into());
    }

    let mut mac = Hmac::<Sha256>::new_from_slice(&context.hmac).unwrap();
    mac.update(&handshake_response.public_key);

    let verification = mac.verify_slice(&handshake_response.signature);
    if verification.is_err() {
        return Err("Invalid signature from the receiver.".into());
    }

    let shared_public_key = PublicKey::from_sec1_bytes(&handshake_response.public_key).unwrap();

    let shared_secret = context.key.diffie_hellman(&shared_public_key);
    let shared_secret = shared_secret.raw_secret_bytes();
    let shared_secret = &shared_secret[0..16];

    let shared_key: &Key<Aes128Gcm> = shared_secret.into();
    let shared_key = <Aes128Gcm as aes_gcm::KeyInit>::new(shared_key);

    context.shared_key = Some(shared_key);

    on_handshake_finalize(context)
}

fn on_message(context: &mut Context, message: WebSocketMessage) -> Result<(), String> {
    if message.is_text() {
        let text = message.into_text().unwrap();
        let packet = serde_json::from_str(&text).unwrap();

        return match packet {
            JsonPacketResponse::Create { id } => on_create_room(context, id),
            JsonPacketResponse::Join { size } => on_join_room(context, size),
            JsonPacketResponse::Leave { index } => on_leave_room(context, index),
            JsonPacketResponse::Error { message } => on_error(message),
        };
    } else if message.is_binary() {
        let data = message.into_data();
        let data = &data[1..];

        let data = if let Some(shared_key) = &context.shared_key {
            let nonce = &data[..NONCE_SIZE];
            let ciphertext = &data[NONCE_SIZE..];

            shared_key.decrypt(nonce.into(), ciphertext).unwrap()
        } else {
            data.to_vec()
        };

        let packet = Packet::decode(data.as_ref()).unwrap();
        let value = packet.value.unwrap();

        return match value {
            Value::HandshakeResponse(handshake_response) => on_handshake(context, handshake_response),
            Value::Progress(progress) => on_progress(context, progress),
            _ => Err(format!("Unexpected packet: {:?}", value)),
        };
    }

    Err("Invalid message type".into())
}

pub async fn start(socket: Socket, paths: Vec<String>) {
    let mut files = vec![];

    for path in paths {
        let handle = match fs::File::open(&path) {
            Ok(handle) => handle,
            Err(error) => {
                println!("Error: Failed to open file '{}': {}", path, error);
                return;
            }
        };

        let name = Path::new(&path).file_name().unwrap().to_str().unwrap();
        let size = handle.metadata().unwrap().len();

        if size == 0 {
            println!("Error: The file {} is empty and cannot be sent.", name);
            return;
        }

        files.push(File {
            name: name.to_string(),
            path,
            size,
        });
    }

    let mut hmac = [0u8; 64];
    OsRng.fill_bytes(&mut hmac);

    let key = EphemeralSecret::random(&mut OsRng);

    let (sender, receiver) = futures_channel::mpsc::unbounded();
    let (outgoing, incoming) = socket.split();

    let mut context = Context {
        sender,
        key,
        files,

        hmac: hmac.to_vec(),
        shared_key: None,
        task: None,
    };

    println!("Attempting to create room...");
    
    context
        .sender
        .send_json_packet(JsonPacket::Create { size: Some(2) });

    let outgoing_handler = receiver.map(Ok).forward(outgoing);
    let incoming_handler = incoming.try_for_each(|message| {
        if let Err(error) = on_message(&mut context, message) {
            println!("Error: {}", error);

            context.sender.close_channel();
        }

        future::ok(())
    });

    pin_mut!(incoming_handler, outgoing_handler);
    future::select(incoming_handler, outgoing_handler).await;
}
