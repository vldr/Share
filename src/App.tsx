import { Component, Show } from "solid-js";
import Sender from "./components/Sender";
import Receiver from "./components/Receiver";

export const App: Component = () => {
  return (
    <Show when={location.hash} fallback={<Sender />}>
      <Receiver />
    </Show>
  );
};
