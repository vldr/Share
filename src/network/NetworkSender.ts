import { IHandshakeResponsePacket, Packet } from "./protobuf/Packets";

export class NetworkSender {
  private readonly ROOM_SIZE = 2;
  private readonly IV_SIZE = 12;
  private readonly DESTINATION = 1;

  private keyPair: CryptoKeyPair | undefined;
  private HMACKey: CryptoKey | undefined;
  private sharedKey: CryptoKey | undefined;

  private webSocket: WebSocket | undefined;

  constructor(
    private readonly URI: string,
    private readonly messageCallback: (data: Uint8Array) => void,
    private readonly createRoomCallback: (inviteCode: string) => void,
    private readonly leaveRoomCallback: () => void,
    private readonly joinRoomCallback: () => void,
    private readonly errorCallback: (message: string) => void
  ) {}

  public async init() {
    this.webSocket = new WebSocket(this.URI);
    this.webSocket.onopen = this.onOpen.bind(this);
    this.webSocket.onclose = this.onClose.bind(this);
    this.webSocket.onerror = this.onError.bind(this);
    this.webSocket.onmessage = this.onMessage.bind(this);
  }

  private async onOpen() {
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
      size: this.ROOM_SIZE,
    });
  }

  private async onClose() {
    return this.error("The connection to the network was closed.");
  }

  private async onError() {
    return this.error(
      "The connection to the network was closed due to an error."
    );
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
        const packet = Packet.decode(data);

        switch (packet.value) {
          case "handshakeResponse":
            return this.onHandshakeResponse(packet.handshakeResponse!);
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
    this.sharedKey = undefined;
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

    const inviteCode =
      id + "-" + btoa(String.fromCharCode(...new Uint8Array(key)));

    this.createRoomCallback(inviteCode);
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

    const packet = Packet.encode({ handshake: { publicKey, signature } });
    const data = packet.finish();

    this.send(data);
  }

  private async onHandshakeResponse(packet: IHandshakeResponsePacket) {
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
      return this.error("Failed to import public key: " + error);
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
          length: 128,
        },
        false,
        ["encrypt", "decrypt"]
      );
    } catch (error) {
      return this.error("Failed to derive key: " + error);
    }

    this.joinRoomCallback();
  }

  public close() {
    if (this.webSocket && this.webSocket.readyState === this.webSocket.OPEN) {
      this.sendJSON({ type: "leave" });
    }
  }

  public error(message: string) {
    this.close();
    this.errorCallback(message);
  }

  private sendJSON(data: any) {
    this.webSocket?.send(JSON.stringify(data));
  }

  public async send(data: Uint8Array) {
    const index = new Uint8Array([this.DESTINATION]);

    if (this.sharedKey) {
      const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_SIZE));

      try {
        const ciphertext = await window.crypto.subtle.encrypt(
          { name: "AES-GCM", iv },
          this.sharedKey,
          data
        );

        const merged = new Uint8Array(
          index.byteLength + iv.byteLength + ciphertext.byteLength
        );

        merged.set(index);
        merged.set(iv, index.length);
        merged.set(new Uint8Array(ciphertext), iv.length + index.length);

        this.webSocket!.send(merged);
      } catch (error) {
        return this.error("Failed to encrypt: " + error);
      }
    } else {
      const merged = new Uint8Array(index.byteLength + data.byteLength);
      merged.set(index);
      merged.set(data, index.length);

      this.webSocket!.send(merged);
    }
  }
}
