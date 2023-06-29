import { Component, Switch, Match, createSignal } from "solid-js";
import LoadingPage from "./pages/LoadingPage";
import ErrorPage from "./pages/ErrorPage";
import SelectFilePage from "./pages/SelectFilePage";
import InvitePage from "./pages/InvitePage";

enum Packet {
  FileList,
  FileProgress,
  FileChunk,
}

type FileListPacket = { index: number; name: string; size: number }[];
type FileProgressPacket = {
  index: number;
  percentage: number;
};

export enum StateType {
  Loading,
  Error,
  Invite,
  SelectFile,
  SendFile,
  ReceiveFile,
}

export interface LoadingState {
  type: StateType.Loading;
  message: string;
}

export interface ErrorState {
  type: StateType.Error;
  message: string;
}

export interface InviteState {
  type: StateType.Invite;
}

export interface SelectFileState {
  type: StateType.SelectFile;
  submit: (files: FileList) => void;
}

export interface SendFileState {
  type: StateType.SendFile;
}

export interface ReceiveFileState {
  type: StateType.ReceiveFile;
}

export type State =
  | LoadingState
  | ErrorState
  | InviteState
  | SelectFileState
  | SendFileState
  | ReceiveFileState;

export const [fileList, setFileList] = createSignal<FileListPacket>([]);
export const [state, setState] = createSignal<State>({
  type: StateType.Loading,
  message: "Attempting to connect...",
});

export const App: Component = () => {
  let files: FileList;
  let id: string;

  const webSocket: WebSocket = new WebSocket("ws://192.168.0.15:58709");
  webSocket.onopen = () => {
    if (location.hash) {
      joinRoom();
    } else {
      setState({ type: StateType.SelectFile, submit: createRoom });
    }
  };

  webSocket.onclose = () => {
    setState({
      type: StateType.Error,
      message: "Disconnected from the server.",
    });
  };

  webSocket.onerror = (event) => {
    setState({
      type: StateType.Error,
      message: "Disconnected from the server: " + event,
    });
  };

  webSocket.onmessage = async (event) => {
    if (event.data instanceof Blob) {
      const arrayBuffer = await event.data.arrayBuffer();
      const data = new Uint8Array(arrayBuffer).slice(1);

      const type = data[0] as Packet;

      switch (type) {
        case Packet.FileList:
          return onFileList(data.slice(1));
      }
    } else {
      const packet = JSON.parse(event.data as string);

      switch (packet.type) {
        case "create":
          return onCreateRoom(packet.id);
        case "join":
          return onJoinRoom(packet?.size);
        case "leave":
          return onLeaveRoom(packet.index);
        case "error":
          return onErrorRoom(packet.message);
      }
    }
  };

  const onCreateRoom = (identifier: string) => {
    id = identifier;
    location.hash = id;

    setState({
      type: StateType.Invite,
    });
  };

  const onJoinRoom = (size: number | undefined) => {
    if (!size) {
      sendFileList();

      setState({
        type: StateType.SendFile,
      });
    } else {
      setState({
        type: StateType.Loading,
        message: "Waiting for files...",
      });
    }
  };

  const onLeaveRoom = (index: number) => {
    if (index) {
      setState({
        type: StateType.Invite,
      });
    } else {
      webSocket.close();
    }
  };

  const onErrorRoom = (message: string) => {
    setState({
      type: StateType.Error,
      message,
    });
  };

  const onFileList = (data: Uint8Array) => {
    const json = new TextDecoder().decode(data);
    const packet = JSON.parse(json) as FileListPacket;

    console.log(packet);
  };

  const joinRoom = () => {
    id = location.hash.replace("#", "");

    const packet = {
      type: "join",
      id,
    };

    webSocket.send(JSON.stringify(packet));
  };

  const createRoom = (selectedFiles: FileList) => {
    files = selectedFiles;

    setState({
      type: StateType.Loading,
      message: "Attempting to create room...",
    });

    const packet = {
      type: "create",
      size: 2,
    };

    webSocket.send(JSON.stringify(packet));
  };

  const send = (type: Packet, data: Uint8Array) => {
    const index = new Uint8Array([255, type]);

    const mergedData = new Uint8Array(index.length + data.length);
    mergedData.set(index);
    mergedData.set(data, index.length);

    webSocket.send(mergedData);
  };

  const sendFileList = () => {
    const packet: FileListPacket = [];
    for (let index = 0; index < files.length; index++) {
      packet.push({ index, name: files[index].name, size: files[index].size });
    }

    const json = JSON.stringify(packet);
    const data = new TextEncoder().encode(json);

    send(Packet.FileList, data);
  };

  return (
    <Switch>
      <Match when={state().type === StateType.Invite}>
        <InvitePage />
      </Match>
      <Match when={state().type === StateType.SelectFile}>
        <SelectFilePage />
      </Match>
      <Match when={state().type === StateType.Loading}>
        <LoadingPage />
      </Match>
      <Match when={state().type === StateType.Error}>
        <ErrorPage />
      </Match>
    </Switch>
  );
};
