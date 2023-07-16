import { Accessor, Setter } from "solid-js";

export type ErrorState = {
  type: "error";
  message: string;
};

export type LoadingState = {
  type: "loading";
  message: string;
};

export type SelectFileState = {
  type: "selectFile";
};

export type InviteState = {
  type: "invite";
};

export type TransferFileState = {
  type: "transferFile";
};

export type TransferCompletedFileState = {
  type: "transferFileCompleted";
};

export type State =
  | ErrorState
  | LoadingState
  | SelectFileState
  | InviteState
  | TransferFileState
  | TransferCompletedFileState;

export type SendFile = {
  index: number;
  name: string;
  size: number;

  setProgress: Setter<number>;
  progress: Accessor<number>;

  file: File;
};

export type ReceiveFile = {
  index: number;
  name: string;
  size: number;

  setProgress: Setter<number>;
  progress: Accessor<number>;

  writer: WritableStreamDefaultWriter<Uint8Array>;
};
