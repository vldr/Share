import { Component, Match, Switch, createSignal } from "solid-js";
import {
  Packet,
  ListPacket,
  IProgressPacket,
} from "../network/protobuf/Packets";
import { PageType, FileType, ErrorPageType, LoadingPageType } from "./Types";
import { NetworkSender } from "../network/NetworkSender";
import ErrorPage from "./pages/ErrorPage";
import InvitePage from "./pages/InvitePage";
import LoadingPage from "./pages/LoadingPage";
import SelectFilePage from "./pages/SelectFilePage";
import TransferFilePage from "./pages/TransferFilePage";
import TransferFileCompletedPage from "./pages/TransferFileCompletedPage";

const Sender: Component = () => {
  const MAX_CHUNK_SIZE = 65535;

  let files: FileType[] = [];
  let index: number;
  let offset: number;
  let size: number;
  let sequence: number;
  let chunkSize: number;

  const [page, setPage] = createSignal<PageType>({
    type: "selectFile",
  });

  const onMessage = (data: Uint8Array) => {
    const packet = Packet.decode(data);

    switch (packet.value) {
      case "progress":
        return onProgress(packet.progress!);
    }
  };

  const onCreateRoom = (inviteCode: string) => {
    location.hash = inviteCode;

    setPage({ type: "invite" });
  };

  const onLeaveRoom = () => {
    for (const file of files) {
      file.setProgress(0);
    }

    if (page().type === "transferFile") {
      setPage({ type: "invite" });
    }
  };

  const onJoinRoom = () => {
    setPage({ type: "transferFile" });

    sendList();
    sendChunks();
  };

  const onError = (message: string) => {
    setPage({ type: "error", message });
  };

  const onProgress = (packet: IProgressPacket) => {
    const file = files[packet.index];
    if (!file) {
      return network.error("Expected valid progress packet index.");
    }

    if (packet.progress === 100 && packet.index === files.length - 1) {
      setPage({ type: "transferFileCompleted" });

      network.close();
    }

    file.setProgress(packet.progress);
  };

  const onSelectFiles = (fileList: FileList) => {
    if (page().type !== "selectFile") {
      return;
    }

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      if (file.size === 0) {
        continue;
      }

      const [progress, setProgress] = createSignal<number>(0);

      files.push({
        index,
        file,

        progress,
        setProgress,

        name: file.name,
        size: file.size,
      });
    }

    if (files.length === 0) {
      return;
    }

    setPage({ type: "loading", message: "Attempting to create room..." });

    network.init();
  };

  const onLoad = () => {
    const chunk = new Uint8Array(fileReader.result as ArrayBuffer);
    const packet = Packet.encode({
      chunk: { chunk, sequence: sequence++ },
    });

    const data = packet.finish();
    network.send(data);

    sendChunk();
  };

  const sendChunk = () => {
    if (page().type !== "transferFile") {
      return;
    }

    if (size === 0) {
      if (index === files.length - 1) {
        return;
      }

      index++;
      offset = 0;
      sequence = 0;
      chunkSize = MAX_CHUNK_SIZE;
      size = files[index].size;
    }

    const file = files[index].file;
    if (!file) {
      return network.error("File handle is invalid.");
    }

    if (size < chunkSize) {
      chunkSize = size;
    }

    const slice = file.slice(offset, offset + chunkSize);

    size -= chunkSize;
    offset += chunkSize;

    fileReader.readAsArrayBuffer(slice);
  };

  const sendChunks = () => {
    index = 0;
    offset = 0;
    sequence = 0;
    chunkSize = MAX_CHUNK_SIZE;
    size = files[index].size;

    sendChunk();
  };

  const sendList = () => {
    const entries: ListPacket.IEntry[] = [];

    for (const file of files) {
      entries.push({
        index: file.index,
        name: file.name,
        size: file.size,
      });
    }

    const packet = Packet.encode({ list: { entries } });
    const data = packet.finish();

    network.send(data);
  };

  const fileReader = new FileReader();
  fileReader.onload = onLoad;

  const network = new NetworkSender(
    import.meta.env.VITE_URI || String(),

    onMessage,
    onCreateRoom,
    onLeaveRoom,
    onJoinRoom,
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
      <Match when={page().type === "invite"}>
        <InvitePage />
      </Match>
      <Match when={page().type === "selectFile"}>
        <SelectFilePage selectFiles={onSelectFiles} />
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

export default Sender;
