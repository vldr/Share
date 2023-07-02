import { Signal } from "solid-js";

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

export type PageType =
  | ErrorPageType
  | LoadingPageType
  | SelectFilePageType
  | InvitePageType
  | TransferFilePageType;

export type FileType = {
  index: number;
  name: string;
  size: number;
  progress: Signal<number>;

  file: File | undefined;
};
