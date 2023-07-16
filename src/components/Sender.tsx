import { Packet, IProgressPacket } from "../network/protobuf/Packets";
import { State, SendFile, ErrorState, LoadingState } from "./Types";
import { Component, Match, Switch, createSignal } from "solid-js";
import { NetworkSender } from "../network/NetworkSender";
import ErrorPage from "./pages/ErrorPage";
import InvitePage from "./pages/InvitePage";
import LoadingPage from "./pages/LoadingPage";
import SelectFilePage from "./pages/SelectFilePage";
import TransferFilePage from "./pages/TransferFilePage";
import TransferFileCompletedPage from "./pages/TransferFileCompletedPage";

const Sender: Component = () => {
  const MAX_CHUNK_SIZE = 65535;

  let files: SendFile[] = [];
  let index: number;
  let offset: number;
  let size: number;
  let sequence: number;
  let chunkSize: number;

  const [state, setState] = createSignal<State>({
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

    setState({ type: "invite" });
  };

  const onLeaveRoom = () => {
    for (const file of files) {
      file.setProgress(0);
    }

    if (state().type === "transferFile") {
      setState({ type: "invite" });
    }
  };

  const onJoinRoom = () => {
    setState({ type: "transferFile" });

    sendList();
    sendChunks();
  };

  const onError = (message: string) => {
    setState({ type: "error", message });
  };

  const onProgress = (packet: IProgressPacket) => {
    const file = files[packet.index];
    if (!file) {
      return network.error("Expected valid progress packet index.");
    }

    if (packet.progress === 100 && packet.index === files.length - 1) {
      setState({ type: "transferFileCompleted" });

      network.close();
    }

    file.setProgress(packet.progress);
  };

  const onSelectFiles = (fileList: FileList) => {
    if (state().type !== "selectFile") {
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

    setState({ type: "loading", message: "Attempting to create room..." });

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
    if (state().type !== "transferFile") {
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
    const entries = [];

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
      <Match when={state().type === "error"}>
        <ErrorPage message={(state() as ErrorState).message} />
      </Match>
      <Match when={state().type === "loading"}>
        <LoadingPage message={(state() as LoadingState).message} />
      </Match>
      <Match when={state().type === "invite"}>
        <InvitePage />
      </Match>
      <Match when={state().type === "selectFile"}>
        <SelectFilePage selectFiles={onSelectFiles} />
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

export default Sender;
