import { defineConfig } from "vite";
import { resolve } from 'path'
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    // devtools(),
    solidPlugin(),
  ],
  define: { global: "window" },
  server: {
    port: 3000,
  },
  publicDir: resolve(__dirname, "src/assets"),
  build: {
    target: "esnext",
  },
});
