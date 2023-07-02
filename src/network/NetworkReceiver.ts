import {
  Packet,
  createPacket,
  deserializePacket,
  serializePacket,
} from "./Packet";

export class NetworkReceiver {
  private readonly IV_SIZE = 12;
  private readonly DESTINATION = 0;

  private keyPair: CryptoKeyPair | undefined;
  private HMACKey: CryptoKey | undefined;
  private sharedKey: CryptoKey | undefined;

  private readonly webSocket: WebSocket;

  constructor(
    URI: string,
    private readonly inviteCode: string | undefined,
    private readonly messageCallback: (data: Uint8Array) => void,
    private readonly errorCallback: (message: string) => void
  ) {
    this.webSocket = new WebSocket(URI);
    this.webSocket.onopen = this.onOpen.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
    this.webSocket.onmessage = this.onMessage.bind(this);
  }

  private async init() {
    if (!this.inviteCode) {
      return this.error("Invite code is invalid.");
    }

    const index = this.inviteCode.lastIndexOf("-");
    if (index === -1) {
      return this.error("Invalid URL structure.");
    }

    const id = this.inviteCode.slice(0, index);
    const key = this.inviteCode.slice(index + 1);

    if (!key || !id) {
      return this.error("Invalid URL components.");
    }

    let keyData;
    try {
      keyData = Uint8Array.from(atob(key), (character) =>
        character.charCodeAt(0)
      );
    } catch (error) {
      return this.error("Failed to decode key data: " + error);
    }

    try {
      this.HMACKey = await window.crypto.subtle.importKey(
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

    this.sendJSON({
      type: "join",
      id,
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
        const iv = data.slice(0, this.IV_SIZE);
        const ciphertext = data.slice(this.IV_SIZE);

        try {
          const plaintext = new Uint8Array(
            await window.crypto.subtle.decrypt(
              { name: "AES-GCM", iv },
              this.sharedKey,
              ciphertext
            )
          );

          return this.messageCallback(plaintext);
        } catch (error) {
          return this.error("Failed to decrypt: " + error);
        }
      } else {
        const packet = deserializePacket(data);

        switch (packet.type) {
          case "Handshake":
            return this.onHandshake(packet.value);
        }
      }
    } else {
      const packet = JSON.parse(event.data as string);

      switch (packet.type) {
        case "leave":
          return this.onLeaveRoom();
        case "error":
          return this.error(packet.message);
      }
    }
  }

  private async onLeaveRoom() {
    return this.error("The sender has left the room.");
  }

  private async onHandshake(packet: Packet<"Handshake">) {
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
      return this.error("The signature from the sender was invalid.");
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
      return this.error("Failed to import public key: " + error);
    }

    await this.sendHandshakeResponse();

    try {
      this.sharedKey = await window.crypto.subtle.deriveKey(
        {
          name: "ECDH",
          public: publicKey,
        },
        this.keyPair.privateKey,
        {
          name: "AES-GCM",
          length: 128,
        },
        false,
        ["encrypt", "decrypt"]
      );
    } catch (error) {
      return this.error("Failed to derive key: " + error);
    }
  }

  public error(message: string) {
    if (this.webSocket.readyState === this.webSocket.OPEN) {
      this.sendJSON({ type: "leave" });
    }

    this.errorCallback(message);
  }

  private async sendHandshakeResponse() {
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

    const packet = createPacket("HandshakeResponse", { publicKey, signature });
    const data = serializePacket(packet);

    this.send(data);
  }

  private async sendJSON(data: any) {
    this.webSocket.send(JSON.stringify(data));
  }

  public async send(data: Uint8Array) {
    const index = new Uint8Array([this.DESTINATION]);

    if (this.sharedKey) {
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      try {
        const ciphertext = await window.crypto.subtle.encrypt(
          { name: "AES-GCM", iv },
          this.sharedKey,
          data
        );

        this.webSocket.send(new Blob([index, iv, ciphertext]));
      } catch (error) {
        return this.error("Failed to encrypt: " + error);
      }
    } else {
      this.webSocket.send(new Blob([index, data]));
    }
  }
}
