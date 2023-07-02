import {
  PageType,
  FileType,
  ErrorPageType,
  LoadingPageType,
} from "../network/Types";
import { Component, Match, Switch, createSignal } from "solid-js";
import { NetworkSender } from "../network/NetworkSender";
import {
  Packet,
  createPacket,
  deserializePacket,
  serializePacket,
} from "../network/Packet";
import ErrorPage from "./pages/ErrorPage";
import InvitePage from "./pages/InvitePage";
import LoadingPage from "./pages/LoadingPage";
import SelectFilePage from "./pages/SelectFilePage";
import TransferFilePage from "./pages/TransferFilePage";
import TransferFileCompletedPage from "./pages/TransferFileCompletedPage";

const Sender: Component = () => {
  const CHUNK_SIZE = 65535;

  let index: number;
  let offset: number;
  let size: number;
  let chunkSize: number;

  const [files, setFiles] = createSignal<FileType[]>([]);
  const [page, setPage] = createSignal<PageType>({
    type: "loading",
    message: "Attempting to connect...",
  });

  const onMessage = (data: Uint8Array) => {
    const packet = deserializePacket(data);

    switch (packet.type) {
      case "Progress":
        return onProgress(packet.value);
    }
  };

  const onOpen = () => {
    setPage({ type: "selectFile" });
  };

  const onCreateRoom = (inviteCode: string) => {
    location.hash = inviteCode;

    setPage({ type: "invite" });
  };

  const onLeaveRoom = () => {
    for (const file of files()) {
      file.setProgress(0);
    }

    if (page().type === "transferFile") {
      setPage({ type: "invite" });
    }
  };

  const onJoinRoom = async () => {
    setPage({ type: "transferFile" });

    await sendList();
    await sendChunks();
  };

  const onError = (message: string) => {
    setPage({ type: "error", message });
  };

  const onProgress = (packet: Packet<"Progress">) => {
    const file = files().at(packet.index);
    if (!file) {
      return network.error("Expected valid progress packet index.");
    }

    if (packet.progress === 100 && packet.index === files().length - 1) {
      setPage({ type: "transferFileCompleted" });
    }

    file.setProgress(packet.progress);
  };

  const onSelectFiles = (fileList: FileList) => {
    if (fileList.length === 0) {
      return network.error("Expected file list to not be empty.");
    }

    const files: FileType[] = [];

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
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

    setFiles(files);
    setPage({ type: "loading", message: "Attempting to create room..." });

    network.init();
  };

  const onLoad = () => {
    const chunk = new Uint8Array(fileReader.result as ArrayBuffer);
    const packet = createPacket("Chunk", { chunk });
    const data = serializePacket(packet);
    network.send(data);

    sendChunk();
  };

  const sendChunk = () => {
    if (page().type !== "transferFile") {
      return;
    }

    if (size === 0) {
      if (index === files().length - 1) {
        return;
      }

      index++;
      offset = 0;
      chunkSize = CHUNK_SIZE;
      size = files()[index].size;
    }

    const file = files()[index].file;
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
    chunkSize = CHUNK_SIZE;
    size = files()[index].size;

    sendChunk();
  };

  const sendList = () => {
    const packet = createPacket("List", []);

    for (const file of files()) {
      packet.value.push({
        index: file.index,
        name: file.name,
        size: file.size,
      });
    }

    const data = serializePacket(packet);
    network.send(data);
  };

  const fileReader = new FileReader();
  fileReader.onload = onLoad;

  const network = new NetworkSender(
    import.meta.env.VITE_URI || String(),
    onMessage,
    onOpen,
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
