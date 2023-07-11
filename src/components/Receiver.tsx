import { Component, Match, Switch, createSignal } from "solid-js";
import { Packet, IChunkPacket, IListPacket } from "../network/protobuf/Packets";
import { PageType, FileType, ErrorPageType, LoadingPageType } from "./Types";
import { NetworkReceiver } from "../network/NetworkReceiver";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import TransferFilePage from "./pages/TransferFilePage";
import TransferFileCompletedPage from "./pages/TransferFileCompletedPage";

const Receiver: Component = () => {
  const MAX_CHUNKS = 1600;

  let files: FileType[] = [];
  let index: number;
  let length: number;
  let progress: number;
  let buffer: Uint8Array[];
  let blob: Blob;
  let chunks: IChunkPacket[];
  let sequence: number;

  const [page, setPage] = createSignal<PageType>({
    type: "loading",
    message: "Attempting to connect...",
  });

  const onMessage = (data: Uint8Array) => {
    const packet = Packet.decode(data);

    switch (packet.value) {
      case "list":
        return onList(packet.list!);
      case "chunk":
        return onChunk(packet.chunk!);
    }
  };

  const onError = (message: string) => {
    setPage({ type: "error", message });
  };

  const onLeaveRoom = () => {
    if (page().type !== "transferFileCompleted") {
      return network.error(
        "File transfer was interrupted because the sender left."
      );
    }
  };

  const onList = (packet: IListPacket) => {
    if (!packet.entries) {
      return network.error("Expected list entires to be valid.");
    }

    for (const file of packet.entries) {
      const [progress, setProgress] = createSignal<number>(0);

      files.push({
        name: file.name,
        index: file.index,
        size: file.size as number,

        progress,
        setProgress,

        file: undefined,
      });
    }

    index = 0;
    length = 0;
    progress = 0;
    sequence = 0;
    buffer = [];
    chunks = [];
    blob = new Blob([]);

    setPage({ type: "transferFile" });
  };

  const onChunk = (packet: IChunkPacket) => {
    const file = files[index];
    if (!file) {
      return network.error("Chunk packet does not match a given index.");
    }

    if (packet.sequence !== sequence) {
      chunks.push(packet);
    } else {
      buffer.push(packet.chunk);

      onChunkSequence();
    }

    if (buffer.length >= MAX_CHUNKS) {
      blob = new Blob([blob, new Blob(buffer)]);
      buffer = [];
    }

    length += packet.chunk.byteLength;

    file.setProgress(((length / file.size) * 100) >> 0);

    if (file.progress() === 100 || file.progress() - progress >= 1) {
      onProgress(file);
    }

    if (file.size === length) {
      onChunkFinish(file);
    }
  };

  const onChunkSequence = () => {
    sequence++;

    if (chunks.length > 0) {
      chunks.sort((a, b) => b.sequence - a.sequence);

      for (let i = chunks.length - 1; i >= 0; i--) {
        const chunk = chunks[i];

        if (chunk.sequence === sequence) {
          sequence++;

          buffer.push(chunk.chunk);
          chunks.splice(i, 1);
        } else {
          break;
        }
      }
    }
  };

  const onChunkFinish = (file: FileType) => {
    if (buffer.length > 0) {
      blob = new Blob([blob, new Blob(buffer)]);
    }

    const a = document.createElement("a");
    document.body.appendChild(a);

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = file.name;
    a.click();

    index++;
    length = 0;
    progress = 0;
    sequence = 0;
    buffer = [];
    chunks = [];
    blob = new Blob([]);

    if (index === files.length) {
      setPage({ type: "transferFileCompleted" });
    }
  };

  const onProgress = (file: FileType) => {
    progress = file.progress();

    const packet = Packet.encode({ progress: { index: file.index, progress } });
    const data = packet.finish();

    network.send(data);
  };

  const network = new NetworkReceiver(
    import.meta.env.VITE_URI || String(),
    location.hash.replace("#", ""),

    onMessage,
    onError,
    onLeaveRoom
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
        <TransferFilePage files={files} />
      </Match>
      <Match when={page().type === "transferFileCompleted"}>
        <TransferFileCompletedPage />
      </Match>
    </Switch>
  );
};

export default Receiver;
