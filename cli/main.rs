pub mod receiver;
pub mod sender;
pub mod shared;

use std::env;
use tokio_tungstenite::connect_async;
use tungstenite::{client::IntoClientRequest, http::HeaderValue};
use url::Url;

const ORIGIN: &str = "ws://vldr.org:1234";

#[tokio::main]
async fn main() {
    let Some(argument) = env::args().nth(1) else {
        println!("Usage: share-cli [file(s) | url]");
        return;
    };

    let Ok(mut request) = ORIGIN.into_client_request() else {
        println!("Error: Failed to create request.");
        return;
    };

    request
        .headers_mut()
        .insert("Origin", HeaderValue::from_static(ORIGIN));

    println!("Attempting to connect...");

    let Ok((socket, _)) = connect_async(request).await else {
        println!("Error: Failed to connect to origin.");
        return;
    };

    if let Ok(url) = Url::parse(&argument) {
        let Some(fragment) = url.fragment() else {
            println!("Error: Missing invite code fragment in url.");
            return;
        };

        receiver::start(socket, fragment).await
    } else {
        let paths = env::args().skip(1).collect();

        sender::start(socket, paths).await
    }
}
