import { Component, Match, Switch, createSignal } from "solid-js";
import { Packet, IChunk, IList } from "../network/protobuf/Packets";
import { PageType, FileType, ErrorPageType, LoadingPageType } from "./Types";
import { NetworkReceiver } from "../network/NetworkReceiver";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import TransferFilePage from "./pages/TransferFilePage";
import TransferFileCompletedPage from "./pages/TransferFileCompletedPage";

const Receiver: Component = () => {
  let index: number;
  let length: number;
  let progress: number;
  let buffer: Uint8Array[];

  const [files, setFiles] = createSignal<FileType[]>([]);
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

  const onList = (packet: IList) => {
    if (!packet.entries) {
      return network.error("Expected list entires to be valid.");
    }

    const files: FileType[] = [];

    for (const file of packet.entries) {
      const [progress, setProgress] = createSignal<number>(0);

      files.push({
        name: file.name,
        index: file.index,
        size: file.size,

        progress,
        setProgress,

        file: undefined,
      });
    }

    index = 0;
    length = 0;
    progress = 0;
    buffer = [];

    setFiles(files);
    setPage({ type: "transferFile" });
  };

  const onChunk = (packet: IChunk) => {
    const file = files()[index];
    if (!file) {
      return network.error("Chunk packet does not match a given index.");
    }

    buffer.push(packet.chunk!);
    length += packet.chunk!.byteLength;

    file.setProgress(((length / file.size) * 100) >> 0);

    if (file.progress() === 100 || file.progress() - progress > 1) {
      onProgress(file);
    }

    if (file.size === length) {
      onChunkFinish(file);
    }
  };

  const onChunkFinish = (file: FileType) => {
    const blob = new Blob(buffer);

    const a = document.createElement("a");
    document.body.appendChild(a);

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = file.name;
    a.click();

    window.URL.revokeObjectURL(url);

    index++;
    length = 0;
    progress = 0;
    buffer = [];

    if (index === files().length) {
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
