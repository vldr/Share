import { Component, Match, Switch, createSignal } from "solid-js";
import { NetworkSender } from "../network/NetworkSender";
import ErrorPage from "./pages/ErrorPage";
import InvitePage from "./pages/InvitePage";
import LoadingPage from "./pages/LoadingPage";
import SelectFilePage from "./pages/SelectFilePage";

type ErrorPage = {
  type: "error";
  message: string;
};

type LoadingPage = {
  type: "loading";
  message: string;
};

type SelectFilePage = {
  type: "selectFile";
};

type InvitePage = {
  type: "invite";
};

type TransferFilePage = {
  type: "transferFile";
};

type Page =
  | ErrorPage
  | LoadingPage
  | SelectFilePage
  | InvitePage
  | TransferFilePage;

type Files = {
  index: number;
  progress: number;
  file: File;
}[];

const Sender: Component = () => {
  const [files, setFiles] = createSignal<Files>([]);
  const [page, setPage] = createSignal<Page>({
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

  const onLeaveRoom = () => {};

  const onJoinRoom = () => {};

  const onError = (message: string) => {
    setPage({ type: "error", message });
  };

  const onSelectFiles = (fileList: FileList) => {
    const files: Files = [];

    for (let index = 0; index < fileList.length; index++) {
      files.push({
        index,
        progress: 0,
        file: fileList[index],
      });
    }

    setFiles(files);
    setPage({ type: "loading", message: "Attempt to create room..." });

    network.init();
  };

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
        <ErrorPage message={(page() as ErrorPage).message} />
      </Match>
      <Match when={page().type === "loading"}>
        <LoadingPage message={(page() as LoadingPage).message} />
      </Match>
      <Match when={page().type === "invite"}>
        <InvitePage />
      </Match>
      <Match when={page().type === "selectFile"}>
        <SelectFilePage selectFiles={onSelectFiles} />
      </Match>
    </Switch>
  );
};

export default Sender;
