import {
  Packet,
  PacketUnion,
  createPacket,
  deserializePacket,
  serializePacket,
} from "./Packet";

const ROOM_SIZE = 2;
const IV_SIZE = 12;

export class NetworkSender {
  private keyPair: CryptoKeyPair | undefined;
  private HMACKey: CryptoKey | undefined;
  private sharedKey: CryptoKey | undefined;

  private readonly webSocket: WebSocket;

  constructor(
    URI: string,
    private readonly messageCallback: (data: ArrayBuffer) => void,
    private readonly createRoomCallback: (inviteCode: string) => void,
    private readonly leaveRoomCallback: () => void,
    private readonly joinRoomCallback: () => void,
    private readonly errorCallback: (message: string) => void
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

    try {
      this.HMACKey = await window.crypto.subtle.generateKey(
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

    this.sendJSON({
      type: "create",
      size: ROOM_SIZE,
    });
  }

  private async onOpen() {
    await this.init();
  }

  private async onClose() {
    return this.error("Network closed.");
  }

  private async onError() {
    return this.error("Network error.");
  }

  private async onMessage(event: MessageEvent) {
    if (event.data instanceof Blob) {
      const arrayBuffer = await event.data.arrayBuffer();
      const data = new Uint8Array(arrayBuffer).slice(1);

      if (this.sharedKey) {
        const iv = data.slice(0, IV_SIZE + 1);
        const ciphertext = data.slice(IV_SIZE + 1);

        try {
          this.messageCallback(
            await window.crypto.subtle.decrypt(
              { name: "AES-GCM", iv },
              this.sharedKey,
              ciphertext
            )
          );
        } catch (error) {
          return this.error("Failed to decrypt: " + error);
        }
      } else {
        const packet = deserializePacket(data);

        switch (packet.type) {
          case "HandshakeResponse":
            return this.onHandshakeResponse(packet.value);
        }
      }
    } else {
      const packet = JSON.parse(event.data as string);

      switch (packet.type) {
        case "create":
          return this.onCreateRoom(packet.id);
        case "leave":
          return this.onLeaveRoom();
        case "join":
          return this.onJoinRoom();
        case "error":
          return this.error(packet.message);
      }
    }
  }

  private async onLeaveRoom() {
    this.leaveRoomCallback();
  }

  private async onCreateRoom(id: string) {
    if (!this.HMACKey) {
      return this.error("HMAC key is not valid.");
    }

    let key: ArrayBuffer;
    try {
      key = await window.crypto.subtle.exportKey("raw", this.HMACKey);
    } catch (error) {
      return this.error("Failed to export HMAC key: " + error);
    }

    this.createRoomCallback(
      id + "-" + btoa(String.fromCharCode(...new Uint8Array(key)))
    );
  }

  private async onJoinRoom() {
    if (!this.HMACKey) {
      return this.error("HMAC key is not valid.");
    }

    if (!this.keyPair) {
      return this.error("Key pair is not valid.");
    }

    let publicKey: Uint8Array;
    try {
      publicKey = new Uint8Array(
        await window.crypto.subtle.exportKey("raw", this.keyPair.publicKey)
      );
    } catch (error) {
      return this.error("Failed to export public key: " + error);
    }

    let signature: Uint8Array;
    try {
      signature = new Uint8Array(
        await window.crypto.subtle.sign("HMAC", this.HMACKey, publicKey)
      );
    } catch (error) {
      return this.error("Failed to export HMAC key: " + error);
    }

    const packet = createPacket("Handshake", { publicKey, signature });
    const data = serializePacket(packet);

    this.send(data);
  }

  private async onHandshakeResponse(packet: Packet<"HandshakeResponse">) {
    if (!this.HMACKey) {
      return this.error("HMAC key is not valid.");
    }

    if (!this.keyPair) {
      return this.error("Key pair is not valid.");
    }

    let verification;
    try {
      verification = await window.crypto.subtle.verify(
        "HMAC",
        this.HMACKey,
        packet.signature,
        packet.publicKey
      );
    } catch (error) {
      return this.error("Failed to verify public key: " + error);
    }

    if (!verification) {
      return this.error("The signature from the receiver was invalid.");
    }

    let publicKey;
    try {
      publicKey = await window.crypto.subtle.importKey(
        "raw",
        packet.publicKey,
        {
          name: "ECDH",
          namedCurve: "P-256",
        },
        false,
        []
      );
    } catch (error) {
      return this.error("Failed to export HMAC key: " + error);
    }

    try {
      this.sharedKey = await window.crypto.subtle.deriveKey(
        {
          name: "ECDH",
          public: publicKey,
        },
        this.keyPair.privateKey,
        {
          name: "AES-GCM",
          length: 256,
        },
        false,
        ["encrypt", "decrypt"]
      );
    } catch (error) {
      return this.error("Failed to derive key: " + error);
    }

    this.joinRoomCallback();
  }

  private error(message: string) {
    if (this.webSocket.readyState === this.webSocket.OPEN) {
      this.webSocket.send(JSON.stringify({ type: "leave" }));
    }

    this.errorCallback(message);
  }

  public async sendJSON(data: any) {
    this.webSocket.send(JSON.parse(data));
  }

  public async send(data: Uint8Array) {
    const index = new Uint8Array([255]);
    const merged = new Uint8Array(index.length + data.length);
    merged.set(index);
    merged.set(data, index.length);

    if (this.sharedKey) {
    } else {
      this.webSocket.send(merged);
    }
  }
}
