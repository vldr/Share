import { struct, uint32, bytes } from "sirdez";

export const Handshake = struct({
  publicKey: bytes(uint32),
  signature: bytes(uint32),
});
