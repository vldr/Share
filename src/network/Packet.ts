import {
  oneOf,
  use,
  uint8,
  GetType,
  bytes,
  uint32,
  struct,
  array,
  uint16,
  string,
  utf8js,
} from "sirdez";

const Handshake = struct({
  publicKey: bytes(uint32),
  signature: bytes(uint32),
});

const HandshakeResponse = struct({
  publicKey: bytes(uint32),
  signature: bytes(uint32),
});

const List = array(
  struct({ index: uint16, name: string(utf8js, uint16), size: uint32 }),
  uint16
);

const Progress = struct({
  index: uint16,
  progress: uint8,
});

const Chunk = struct({
  chunk: bytes(uint16),
});

const Packet = oneOf(uint8, {
  Handshake,
  HandshakeResponse,
  List,
  Progress,
  Chunk,
});

const { fromBytes, toBytes } = use(Packet);

type PacketInner<T extends string> = Extract<
  GetType<typeof Packet>,
  { type: T }
>;

export type Packet<T extends string> = PacketInner<T>["value"];

export function createPacket<T extends string>(
  type: T,
  value: Packet<T>
): PacketInner<T> {
  return { type, value } as PacketInner<T>;
}

export function serializePacket(packet: GetType<typeof Packet>): Uint8Array {
  return toBytes(packet);
}

export function deserializePacket(data: Uint8Array): GetType<typeof Packet> {
  return fromBytes(data);
}
