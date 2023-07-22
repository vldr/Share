import { Packets } from "../network/Packets";
import { Component, Match, Switch, createSignal } from "solid-js";
import { State, ReceiveFile, ErrorState, LoadingState } from "./Types";
import { NetworkReceiver } from "../network/NetworkReceiver";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import TransferFilePage from "./pages/TransferFilePage";
import TransferFileCompletedPage from "./pages/TransferFileCompletedPage";

import StreamSaver from "streamsaver";
StreamSaver.mitm = "mitm.html";

const Receiver: Component = () => {
  let files: ReceiveFile[] = [];
  let index: number;
  let length: number;
  let progress: number;
  let sequence: number;
  let chunks: Packets.IChunkPacket[];
  let writer: WritableStreamDefaultWriter<Uint8Array>;

  const [state, setState] = createSignal<State>({
    type: "loading",
    message: "Attempting to connect...",
  });

  const onMessage = (data: Uint8Array) => {
    const packet = Packets.Packet.decode(data);

    switch (packet.value) {
      case "list":
        return onList(packet.list!);
      case "chunk":
        return onChunk(packet.chunk!);
    }
  };

  const onError = (message: string) => {
    setState({ type: "error", message });

    onUnload();
  };

  const onLeaveRoom = () => {
    if (state().type !== "transferFileCompleted") {
      return network.error(
        "File transfer was interrupted because the sender left."
      );
    }
  };

  const onList = async (packet: Packets.IListPacket) => {
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
      });
    }

    chunks = [];
    index = 0;
    length = 0;
    progress = 0;
    sequence = 0;

    setState({ type: "transferFile" });
  };

  const onChunk = (packet: Packets.IChunkPacket) => {
    const file = files[index];
    if (!file) {
      return network.error("Chunk packet does not match a given index.");
    }

    if (packet.sequence === 0) {
      writer = StreamSaver.createWriteStream(file.name, { size: file.size as number }).getWriter();
    }

    if (packet.sequence !== sequence) {
      chunks.push(packet);
    } else {
      writer
        .write(packet.chunk)
        .catch(() => network.error("File transfer cancelled."));

      onChunkReorder();
    }

    length += packet.chunk.byteLength;

    file.setProgress(((length / file.size) * 100) >> 0);

    if (file.progress() === 100 || file.progress() - progress >= 1) {
      onProgress(file);
    }

    if (file.size === length) {
      onChunkFinish();
    }
  };

  const onChunkReorder = () => {
    sequence++;

    if (chunks.length > 0) {
      chunks.sort((a, b) => b.sequence - a.sequence);

      for (let i = chunks.length - 1; i >= 0; i--) {
        const chunk = chunks[i];

        if (chunk.sequence === sequence) {
          sequence++;

          writer
            .write(chunk.chunk)
            .catch(() => network.error("File transfer cancelled."));

          chunks.splice(i, 1);
        } else {
          break;
        }
      }
    }
  };

  const onChunkFinish = () => {
    writer.close();

    index++;
    length = 0;
    progress = 0;
    sequence = 0;
    chunks = [];

    if (index === files.length) {
      setState({ type: "transferFileCompleted" });
    }
  };

  const onProgress = (file: ReceiveFile) => {
    progress = file.progress();

    const packet = Packets.Packet.encode({ progress: { index: file.index, progress } });
    const data = packet.finish();

    network.send(data);
  };

  const onUnload = () => {
    for (const file of files) {
      if (writer) {
        writer.abort();
      }
    }
  };

  const network = new NetworkReceiver(
    import.meta.env.VITE_URI || String(),
    location.hash.replace("#", ""),

    onMessage,
    onError,
    onLeaveRoom
  );

  window.onunload = onUnload;

  return (
    <Switch>
      <Match when={state().type === "error"}>
        <ErrorPage message={(state() as ErrorState).message} />
      </Match>
      <Match when={state().type === "loading"}>
        <LoadingPage message={(state() as LoadingState).message} />
      </Match>
      <Match when={state().type === "transferFile"}>
        <TransferFilePage files={files} />
      </Match>
      <Match when={state().type === "transferFileCompleted"}>
        <TransferFileCompletedPage />
      </Match>
    </Switch>
  );
};

export default Receiver;
