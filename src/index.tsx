/* @refresh reload */
import { App } from "./App";
import { render } from "solid-js/web";

import "./index.css";

const root = document.getElementById("root");

render(() => <App />, root!);
