import { Component, Match, Switch, createSignal } from "solid-js";
import { NetworkSender } from "../network/NetworkSender";
import ErrorPage from "./pages/ErrorPage";
import InvitePage from "./pages/InvitePage";

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

const Sender: Component = () => {
  const [page, setPage] = createSignal<Page>({
    type: "loading",
    message: "Attempting to connect...",
  });

  const onOpen = () => {
    setPage({ type: "selectFile" });
  };

  const onCreateRoom = (inviteCode: string) => {};

  const onLeaveRoom = () => {};

  const onJoinRoom = () => {};

  const onError = (message: string) => {};

  const onMessage = (data: Uint8Array) => {};

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
      <Match when={page().type === "invite"}>
        <InvitePage />
      </Match>
    </Switch>
  );
};

export default Sender;
