import { Component } from "solid-js";
import { NetworkSender } from "../network/NetworkSender";

const Sender: Component = () => {
  const onMessage = (data: Uint8Array) => {};
  const onOpen = () => {};
  const onCreateRoom = (inviteCode: string) => {};
  const onLeaveRoom = () => {};
  const onJoinRoom = () => {};
  const onError = () => {};

  const network = new NetworkSender(
    process.env.URI || String(),
    onMessage,
    onOpen,
    onCreateRoom,
    onLeaveRoom,
    onJoinRoom,
    onError
  );

  return <>Sender</>;
};

export default Sender;
