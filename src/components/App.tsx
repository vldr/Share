import { Component, Switch, Match, createSignal } from "solid-js";
// import LoadingPage from "./pages/LoadingPage";
// import ErrorPage from "./pages/ErrorPage";
// import SelectFilePage from "./pages/SelectFilePage";
// import InvitePage from "./pages/InvitePage";

enum Packet {
  FileArray,
  FileProgress,
  FileChunk,
}

type FileArray = {
  index: number;
  name: string;
  progress: number;
  size: number;
}[];
type FileProgress = {
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

export const [fileArray, setFileArray] = createSignal<FileArray>([]);
export const [state, setState] = createSignal<State>({
  type: StateType.Loading,
  message: "Attempting to connect...",
});

export const App: Component = () => {
  // let files: FileList;
  // let id: string;
  // let buffer: Uint8Array[];

  // const BLOCK_SIZE = 65536;
  // const URI = "ws://127.0.0.1:53810";

  // const webSocket: WebSocket = new WebSocket(URI);
  // webSocket.onopen = () => {
  //   if (location.hash) {
  //     joinRoom();
  //   } else {
  //     setState({ type: StateType.SelectFile, submit: createRoom });
  //   }
  // };

  // webSocket.onclose = () => {
  //   setState({
  //     type: StateType.Error,
  //     message: "Disconnected from the server.",
  //   });
  // };

  // webSocket.onerror = (event) => {
  //   setState({
  //     type: StateType.Error,
  //     message: "Disconnected from the server: " + event,
  //   });
  // };

  // webSocket.onmessage = async (event) => {
  //   if (event.data instanceof Blob) {
  //     const arrayBuffer = await event.data.arrayBuffer();
  //     const data = new Uint8Array(arrayBuffer).slice(1);

  //     const type = data[0] as Packet;

  //     switch (type) {
  //       case Packet.FileArray:
  //         return onFileArray(data.slice(1));
  //       case Packet.FileChunk:
  //         return onFileChunk(data.slice(1));
  //     }
  //   } else {
  //     const packet = JSON.parse(event.data as string);

  //     switch (packet.type) {
  //       case "create":
  //         return onCreateRoom(packet.id);
  //       case "join":
  //         return onJoinRoom(packet?.size);
  //       case "leave":
  //         return onLeaveRoom(packet.index);
  //       case "error":
  //         return onErrorRoom(packet.message);
  //     }
  //   }
  // };

  // const onCreateRoom = (identifier: string) => {
  //   id = identifier;
  //   location.hash = id;

  //   setState({
  //     type: StateType.Invite,
  //   });
  // };

  // const onJoinRoom = (size: number | undefined) => {
  //   if (!size) {
  //     sendFiles();
  //     setState({
  //       type: StateType.SendFile,
  //     });
  //   } else {
  //     setState({
  //       type: StateType.Loading,
  //       message: "Waiting for files...",
  //     });
  //   }
  // };

  // const onLeaveRoom = (index: number) => {
  //   if (index) {
  //     setState({
  //       type: StateType.Invite,
  //     });
  //   } else {
  //     webSocket.close();
  //   }
  // };

  // const onErrorRoom = (message: string) => {
  //   setState({
  //     type: StateType.Error,
  //     message,
  //   });
  // };

  // const onFileChunk = (data: Uint8Array) => {
  //   if (fileArray().length === 0) {
  //     setState({
  //       type: StateType.Error,
  //       message: "Unexpected file chunk while no files exist.",
  //     });
  //     return;
  //   }

  //   buffer.push(data);

  //   setFileArray((previousFileArray) => {
  //     const filesArray = [...previousFileArray];

  //     filesArray[0].progress += data.byteLength;

  //     console.log(filesArray[0].index, data.byteLength, filesArray[0].size);

  //     if (filesArray[0].size == filesArray[0].progress) {
  //       console.log("file done ", filesArray[0]);
  //       filesArray.shift();
  //       buffer = [];
  //     }

  //     return filesArray;
  //   });
  // };

  // const onFileArray = (data: Uint8Array) => {
  //   buffer = [];

  //   const json = new TextDecoder().decode(data);
  //   const fileArray = JSON.parse(json) as FileArray;

  //   setFileArray(fileArray);
  //   setState({ type: StateType.ReceiveFile });
  // };

  // const joinRoom = () => {
  //   id = location.hash.replace("#", "");

  //   const packet = {
  //     type: "join",
  //     id,
  //   };

  //   webSocket.send(JSON.stringify(packet));
  // };

  // const createRoom = (selectedFiles: FileList) => {
  //   files = selectedFiles;

  //   setState({
  //     type: StateType.Loading,
  //     message: "Attempting to create room...",
  //   });

  //   const packet = {
  //     type: "create",
  //     size: 2,
  //   };

  //   webSocket.send(JSON.stringify(packet));
  // };

  // const send = (type: Packet, data: Uint8Array) => {
  //   const index = new Uint8Array([255, type]);

  //   const mergedData = new Uint8Array(index.length + data.length);
  //   mergedData.set(index);
  //   mergedData.set(data, index.length);

  //   webSocket.send(mergedData);
  // };

  // const sendFiles = () => {
  //   const fileArray: FileArray = [];
  //   for (let index = 0; index < files.length; index++) {
  //     fileArray.push({
  //       index,
  //       progress: 0,
  //       name: files[index].name,
  //       size: files[index].size,
  //     });
  //   }

  //   const json = JSON.stringify(fileArray);
  //   const data = new TextEncoder().encode(json);

  //   setFileArray(fileArray);
  //   send(Packet.FileArray, data);

  //   for (const file of files) {
  //     const fileReader = new FileReader();

  //     let blockSize = BLOCK_SIZE;
  //     let offset = 0;
  //     let size = file.size;

  //     const seek = () => {
  //       if (size) {
  //         if (size < blockSize) {
  //           blockSize = size;
  //         }

  //         const slice = file.slice(offset, offset + blockSize);

  //         size -= blockSize;
  //         offset += blockSize;

  //         console.log(blockSize);

  //         fileReader.readAsArrayBuffer(slice);
  //       }
  //     };

  //     fileReader.onload = () => {
  //       send(
  //         Packet.FileChunk,
  //         new Uint8Array(fileReader.result as ArrayBuffer)
  //       );

  //       seek();
  //     };

  //     seek();
  //   }
  // };

  // return (
  //   <Switch>
  //     <Match when={state().type === StateType.Invite}>
  //       <InvitePage />
  //     </Match>
  //     <Match when={state().type === StateType.SelectFile}>
  //       <SelectFilePage />
  //     </Match>
  //     <Match when={state().type === StateType.Loading}>
  //       <LoadingPage />
  //     </Match>
  //     <Match when={state().type === StateType.Error}>
  //       <ErrorPage />
  //     </Match>
  //   </Switch>
  // );

  return <></>;
};
