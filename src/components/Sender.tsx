import {
  PageType,
  FileType,
  ErrorPageType,
  LoadingPageType,
} from "../network/Types";
import { Component, Match, Switch, createSignal } from "solid-js";
import { NetworkSender } from "../network/NetworkSender";
import ErrorPage from "./pages/ErrorPage";
import InvitePage from "./pages/InvitePage";
import LoadingPage from "./pages/LoadingPage";
import SelectFilePage from "./pages/SelectFilePage";
import { createPacket, serializePacket } from "../network/Packet";
import TransferFilePage from "./pages/TransferFilePage";

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

  const onMessage = (data: Uint8Array) => {};

  const onOpen = () => {
    setPage({ type: "selectFile" });
  };

  const onCreateRoom = (inviteCode: string) => {
    location.hash = inviteCode;

    setPage({ type: "invite" });
  };

  const onLeaveRoom = () => {
    setPage({ type: "invite" });
  };

  const onJoinRoom = async () => {
    setPage({ type: "transferFile" });

    await sendList();
    await sendChunks();
  };

  const onError = (message: string) => {
    setPage({ type: "error", message });
  };

  const onSelectFiles = (fileList: FileList) => {
    if (fileList.length === 0) {
      setPage({
        type: "error",
        message: "Expected file list to not be empty.",
      });
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
    const packet = createPacket("Chunk", { index, chunk });
    const data = serializePacket(packet);
    network.send(data);

    sendChunk();
  };

  const sendChunk = () => {
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
      setPage({ type: "error", message: "File handle is invalid." });
      return;
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
        <TransferFilePage files={files()} />
      </Match>
    </Switch>
  );
};

export default Sender;
