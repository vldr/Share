/* @refresh reload */
import { App } from "./components/App";
import { render } from "solid-js/web";

import "./index.css";

const root = document.getElementById("root");

render(() => <App />, root!);
