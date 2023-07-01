import { Packet, deserializePacket } from "./Packet";

export class NetworkReceiver {
  private keyPair: CryptoKeyPair | undefined;
  private hmacKey: CryptoKey | undefined;
  private sharedKey: CryptoKey | undefined;

  private readonly webSocket: WebSocket;

  constructor(
    URI: string,
    private readonly inviteCode: string | undefined,
    private readonly messageCallback: (data: Uint8Array) => void,
    private readonly readyCallback: (hash: string) => void,
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
      }
    } else {
      const packet = JSON.parse(event.data as string);

      switch (packet.type) {
        case "create":
          return this.onCreateRoom(packet.id);
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

  private async onLeaveRoom(index: number) {
    return this.error("The sender has left the room.");
  }

  private async onHandshake(packet: Packet<"Handshake">) {}

  private error(message: string) {
    if (this.webSocket.readyState === this.webSocket.OPEN) {
      this.webSocket.send(JSON.stringify({ type: "leave" }));
    }

    this.errorCallback(message);
  }

  public send(data: Uint8Array) {}
  public sendUnecrypted(data: Uint8Array) {}
}
