import {
  PageType,
  FileType,
  ErrorPageType,
  LoadingPageType,
} from "../network/Types";
import { Component, Match, Switch, createSignal } from "solid-js";
import { NetworkReceiver } from "../network/NetworkReceiver";
import {
  Packet,
  createPacket,
  deserializePacket,
  serializePacket,
} from "../network/Packet";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import TransferFilePage from "./pages/TransferFilePage";

const Receiver: Component = () => {
  let index: number = 0;
  let length: number = 0;
  let buffer: Blob[] = [];

  const [files, setFiles] = createSignal<FileType[]>([]);
  const [page, setPage] = createSignal<PageType>({
    type: "loading",
    message: "Attempting to connect...",
  });

  const onMessage = (data: Uint8Array) => {
    const packet = deserializePacket(data);

    switch (packet.type) {
      case "List":
        return onList(packet.value);
      case "Chunk":
        return onChunk(packet.value);
    }
  };

  const onError = (message: string) => {
    setPage({ type: "error", message });
  };

  const onList = (packet: Packet<"List">) => {
    console.log(packet);
  };

  const onChunk = (packet: Packet<"Chunk">) => {
    console.log(packet);
  };

  const network = new NetworkReceiver(
    import.meta.env.VITE_URI || String(),
    location.hash.replace("#", ""),
    onMessage,
    onError
  );

  return (
    <Switch>
      <Match when={page().type === "error"}>
        <ErrorPage message={(page() as ErrorPageType).message} />
      </Match>
      <Match when={page().type === "loading"}>
        <LoadingPage message={(page() as LoadingPageType).message} />
      </Match>
      <Match when={page().type === "transferFile"}>
        <TransferFilePage files={files()} />
      </Match>
    </Switch>
  );
};

export default Receiver;
