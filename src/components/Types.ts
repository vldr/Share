import { Accessor, Setter } from "solid-js";

export type ErrorPageType = {
  type: "error";
  message: string;
};

export type LoadingPageType = {
  type: "loading";
  message: string;
};

export type SelectFilePageType = {
  type: "selectFile";
};

export type InvitePageType = {
  type: "invite";
};

export type TransferFilePageType = {
  type: "transferFile";
};

export type TransferCompletedFilePageType = {
  type: "transferFileCompleted";
};

export type PageType =
  | ErrorPageType
  | LoadingPageType
  | SelectFilePageType
  | InvitePageType
  | TransferFilePageType
  | TransferCompletedFilePageType;

export type FileType = {
  index: number;
  name: string;
  size: number;

  setProgress: Setter<number>;
  progress: Accessor<number>;

  file: File | undefined;
};
