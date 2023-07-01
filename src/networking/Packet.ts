import { oneOf, use, uint8, GetType } from "sirdez";
import { Handshake } from "./HandshakePacket";
import { HandshakeResponse } from "./HandshakeResponsePacket";

const Packet = oneOf(uint8, {
  Handshake,
  HandshakeResponse,
});

const { fromBytes, toUnsafeBytes } = use(Packet);

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
  return toUnsafeBytes(packet);
}

export function deserializePacket(data: Uint8Array): GetType<typeof Packet> {
  return fromBytes(data);
}
