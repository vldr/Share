import { defineConfig } from "vite";
import { resolve } from "path";
import solidPlugin from "vite-plugin-solid";
import mkcertPlugin from "vite-plugin-mkcert";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    // devtools(),
    solidPlugin(),
    mkcertPlugin(),
  ],
  define: { global: "window" },
  server: {
    https: true,
    port: 3000,
  },
  publicDir: resolve(__dirname, "src/assets"),
  build: {
    target: "esnext",
  },
});
