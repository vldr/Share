pub mod packets {
    include!(concat!(env!("OUT_DIR"), "/packets.rs"));
}

use aes_gcm::{
    aead::{Aead, AeadCore},
    Aes128Gcm,
};

use futures_util::{stream::SplitSink, SinkExt};
use packets::Packet;
use prost::Message;
use rand::rngs::OsRng;
use serde::{Deserialize, Serialize};
use tokio::net::TcpStream;
use tokio_tungstenite::tungstenite::protocol::Message as WebSocketMessage;
use tokio_tungstenite::{MaybeTlsStream, WebSocketStream};

#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum JsonPacket {
    Join { id: String },
    Create { size: Option<usize> },
    Leave,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum JsonPacketResponse {
    Join {
        #[serde(skip_serializing_if = "Option::is_none")]
        size: Option<usize>,
    },
    Create {
        id: String,
    },
    Leave {
        index: usize,
    },
    Error {
        message: String,
    },
}

pub enum Status {
    Continue(),
    Exit(),
    Err(String),
}

pub type Socket = WebSocketStream<MaybeTlsStream<TcpStream>>;
pub type Sender = SplitSink<Socket, WebSocketMessage>;

pub async fn send_json_packet(sender: &mut Sender, packet: JsonPacket) {
    let serialized_packet = serde_json::to_string(&packet).unwrap();

    sender
        .send(WebSocketMessage::Text(serialized_packet))
        .await
        .unwrap()
}

pub async fn send_packet(sender: &mut Sender, destination: u8, value: packets::packet::Value) {
    let packet = Packet { value: Some(value) };

    let mut serialized_packet = packet.encode_to_vec();
    serialized_packet.insert(0, destination);

    sender
        .send(WebSocketMessage::Binary(serialized_packet))
        .await
        .unwrap()
}

pub async fn send_encrypted_packet(
    sender: &mut Sender,
    key: &Option<Aes128Gcm>,
    destination: u8,
    value: packets::packet::Value,
) {
    let packet = Packet { value: Some(value) };

    let nonce = Aes128Gcm::generate_nonce(&mut OsRng);
    let plaintext = packet.encode_to_vec();
    let mut ciphertext = key
        .as_ref()
        .unwrap()
        .encrypt(&nonce, plaintext.as_ref())
        .unwrap();

    let mut serialized_packet = nonce.to_vec();
    serialized_packet.append(&mut ciphertext);
    serialized_packet.insert(0, destination);

    sender
        .send(WebSocketMessage::Binary(serialized_packet))
        .await
        .unwrap()
}
