import { defineConfig } from "vite";
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
  publicDir: "src/public",
  build: {
    target: "esnext",
  },
});
