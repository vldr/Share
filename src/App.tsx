import { Component, Switch, Match, createSignal } from "solid-js";
// import LandingPage from "./pages/LandingPage";
import LoadingPage from "./pages/LoadingPage";
import ErrorPage from "./pages/ErrorPage";
// import MainPage from "./pages/SendPage";

export interface LoadingState {
  state: "loading";
  message: string;
}

export interface ErrorState {
  state: "error";
  message: string;
}

export interface InfoState {
  state: "info";
  type: "create" | "join";
}

export interface ReadyState {
  state: "ready";
}

export type State = ReadyState | LoadingState | ErrorState | InfoState;
export const [state, setState] = createSignal<State>({
  state: "loading",
  message: "Attempting to connect...",
});

export const App: Component = () => {
  const webSocket = new WebSocket("ws://127.0.0.1:58709");
  webSocket.onopen = () => {};
  webSocket.onclose = () => {};
  webSocket.onerror = () => {};
  webSocket.onmessage = (event: MessageEvent) => {};

  return (
    <Switch>
      <Match when={state().state === "ready"}>{/* <MainPage /> */}</Match>
      <Match when={state().state === "info"}>
        {/* <LandingPage state={state() as InfoState} /> */}
      </Match>
      <Match when={state().state === "loading"}>
        <LoadingPage state={state() as LoadingState} />
      </Match>
      <Match when={state().state === "error"}>
        <ErrorPage state={state() as ErrorState} />
      </Match>
    </Switch>
  );
};
