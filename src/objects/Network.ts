import { Packet, deserializePacket } from "./Packet";

export type NetworkSenderState = {
  type: "sender";
};

export type NetworkReceiverState = {
  type: "receiver";
  hash: string;
};

export type NetworkState = NetworkSenderState | NetworkReceiverState;

export class Network {
  private keyPair: CryptoKeyPair | undefined;
  private hmacKey: CryptoKey | undefined;
  private sharedKey: CryptoKey | undefined;

  private readonly webSocket: WebSocket;

  constructor(
    URI: string,
    private readonly state: NetworkState,
    private readonly messageCallback: (data: Uint8Array) => void,
    private readonly readyCallback: (hash: string) => void,
    private readonly closeCallback: () => void
  ) {
    this.webSocket = new WebSocket(URI);
    this.webSocket.onopen = this.onOpen.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
    this.webSocket.onmessage = this.onMessage.bind(this);
  }

  private async init() {
    try {
      this.keyPair = await window.crypto.subtle.generateKey(
        {
          name: "ECDH",
          namedCurve: "P-256",
        },
        false,
        ["deriveKey"]
      );
    } catch (error) {
      return this.error("Failed to generate public-private key: " + error);
    }

    if (this.state.type === "sender") {
      this.initSender();
    } else if (this.state.type === "receiver") {
      this.initReceiver(this.state);
    }
  }

  private async initSender() {
    try {
      this.hmacKey = await window.crypto.subtle.generateKey(
        {
          name: "HMAC",
          hash: { name: "SHA-256" },
        },
        true,
        ["sign", "verify"]
      );
    } catch (error) {
      return this.error("Failed to generate HMAC key: " + error);
    }

    this.webSocket.send(
      JSON.stringify({
        type: "create",
        size: 2,
      })
    );
  }

  private async initReceiver(state: NetworkReceiverState) {
    const index = state.hash.lastIndexOf("-");
    if (index === -1) {
      return this.error("Invalid URL structure.");
    }

    const id = state.hash.slice(0, index);
    const key = state.hash.slice(index + 1);

    if (!key || id) {
      return this.error("Invalid URL components.");
    }

    const keyData = Uint8Array.from(atob(key), (character) =>
      character.charCodeAt(0)
    );

    try {
      this.hmacKey = await window.crypto.subtle.importKey(
        "raw",
        keyData,
        {
          name: "HMAC",
          hash: { name: "SHA-256" },
        },
        false,
        ["sign", "verify"]
      );
    } catch (error) {
      return this.error("Failed to import HMAC key: " + error);
    }

    this.webSocket.send(
      JSON.stringify({
        type: "join",
        id,
      })
    );
  }

  private async onOpen() {
    await this.init();
  }

  private async onMessage(event: MessageEvent) {
    if (event.data instanceof Blob) {
      const arrayBuffer = await event.data.arrayBuffer();
      const data = new Uint8Array(arrayBuffer).slice(1);

      const packet = deserializePacket(data);

      switch (packet.type) {
        case "Handshake":
          return this.onHandshake(packet.value);
        case "HandshakeResponse":
          return this.onHandshakeResponse(packet.value);
      }
    } else {
      const packet = JSON.parse(event.data as string);

      switch (packet.type) {
        case "create":
          return this.onCreateRoom(packet.id);
        case "join":
          return this.onJoinRoom(packet?.size);
        case "leave":
          return this.onLeaveRoom(packet.index);
        case "error":
          return this.error(packet.message);
      }
    }
  }

  private async onClose() {}
  private async onError() {}

  private async onCreateRoom(id: string) {
    if (!this.hmacKey) {
      return this.error("HMAC key is not valid.");
    }

    let key: ArrayBuffer;
    try {
      key = await window.crypto.subtle.exportKey("raw", this.hmacKey);
    } catch (error) {
      return this.error("Failed to export HMAC key: " + error);
    }

    this.readyCallback(
      id + "-" + btoa(String.fromCharCode(...new Uint8Array(key)))
    );
  }

  private async onJoinRoom(size: number | undefined) {
    if (!size) {
    }
  }

  private async onLeaveRoom(index: number) {
    if (index) {
      return this.error("The receiver has left the room.");
    } else {
      return this.error("The sender has left the room.");
    }
  }

  private async onHandshake(packet: Packet<"Handshake">) {}
  private async onHandshakeResponse(packet: Packet<"HandshakeResponse">) {}

  private error(message: string) {}

  public send(data: Uint8Array) {}
  public sendUnecrypted(data: Uint8Array) {}
}
