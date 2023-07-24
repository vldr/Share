<p align="center">
    <img src='logo.svg?raw=true' width='50%'>
</p>

---

Share is an end-to-end encrypted, peer-to-peer file transfer platform allowing you to send files of any size just by sharing a link.

## Try it out

### Web 

You can use Share from the web by visiting: https://share.vldr.org/

### CLI

You can use Share from the command-line by downloading the precompiled binary for your platform or by [building](#building-and-running-1) it from source:

- [Windows](https://github.com/vldr/Share/releases/download/CLI/share-cli-windows-amd64.exe)
- [Linux](https://github.com/vldr/Share/releases/download/CLI/share-cli-linux-amd64)
- [MacOS](https://github.com/vldr/Share/releases/download/CLI/share-cli-macos-amd64)

The following are the command-line arguments for the application:

`share-cli [file(s) | url]`

## Building and Running

The following instructions assume that you are in a terminal like bash, zsh, cmd, etc.

### Web

#### Building

**Note:** You will need to have an instance of [Relay](https://github.com/vldr/Relay) running. Then, you will need to update the environment variable `VITE_URI=` with the address of your Relay instance inside the `.env.production` file.

1. Install [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/).
2. Run `npm i`
3. Run `npm run build`

After the build process completes, the output files will be located in the `dist/` directory.

#### Running

**Note:** You will need to have an instance of [Relay](https://github.com/vldr/Relay) running. Then, you will need to create a file called `.env.development` and add the environment variable `VITE_URI=` with the address of your Relay instance.

1. Install [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/).
2. Run `npm i`
3. Run `npm run proto`
4. Run `npm run dev`
5. Press `Control + C` to stop running.

### CLI

**Note:** You will need to have an instance of [Relay](https://github.com/vldr/Relay) running. Then, you will need to update the  variable `ORIGIN` in the `cli/main.rs` file with the address of your Relay instance.

#### Building and Running

1. Install [Rust](https://www.rust-lang.org/learn/get-started) and Cargo.
2. Run `cargo build --release`

After the build process completes, the compiled binary will be located in the `target/release` directory.
