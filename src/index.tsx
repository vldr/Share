/* @refresh reload */
import { App } from "./App";
import { render } from "solid-js/web";

import "./index.css";

const resize = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
resize();

window.onresize = resize;

const root = document.getElementById("root");

render(() => <App />, root!);
