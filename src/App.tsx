import { Component, Switch, Match, createSignal } from "solid-js";
import LoadingPage from "./pages/LoadingPage";
import ErrorPage from "./pages/ErrorPage";
import SelectFilePage from "./pages/SelectFilePage";
import InvitePage from "./pages/InvitePage";

type File = {
  index: number;
  name: string;
  size: number;
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
  id: string;
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

export const [state, setState] = createSignal<State>({
  type: StateType.Loading,
  message: "Attempting to connect...",
});

export const App: Component = () => {
  let files: FileList;

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

  webSocket.onmessage = (event) => {
    if (event.data instanceof Blob) {
    } else {
      const packet = JSON.parse(event.data as string);

      switch (packet.type) {
        case "create":
          return onCreateRoom(packet.id);
        case "join":
          return onJoinRoom(packet?.size);
        case "leave":
          return onLeaveRoom();
        case "error":
          return onErrorRoom(packet.message);
      }
    }
  };

  const onCreateRoom = (id: string) => {
    location.hash = id;

    setState({
      type: StateType.Invite,
      id,
    });
  };

  const onJoinRoom = (size: number | undefined) => {};
  const onLeaveRoom = () => {};

  const onErrorRoom = (message: string) => {
    setState({
      type: StateType.Error,
      message,
    });
  };

  const joinRoom = () => {
    const id = location.hash.replace("#", "");

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
