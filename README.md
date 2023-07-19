<p align="center">
    <img src='logo.svg?raw=true' width='50%'>
</p>

---

Share is an end-to-end encrypted, peer-to-peer file transfer platform allowing you to send files of any size just by sharing a link.

## [Try it out](https://share.vldr.org/)

You can try Share by visiting the above link.

## Building and Running

The following instructions assume that you are in a terminal like bash, zsh, cmd, etc.

### Building

**Note:** You will need to have an instance of [Relay](https://github.com/vldr/Relay) running. Then, you will need to update the environment variable `VITE_URI=` with the address of your Relay instance inside the `.env.production` file.

1. Install [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/).
2. Run `npm i`
3. Run `npm run build`

After the build process completes, the output files will be located in the `dist/` directory.

### Running

**Note:** You will need to have an instance of [Relay](https://github.com/vldr/Relay) running. Then, you will need to create a file called `.env.development` and add the environment variable `VITE_URI=` with the address of your Relay instance.

1. Install [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/).
2. Run `npm i`
3. Run `npm run proto`
4. Run `npm run dev`
5. Press `Control + C` to stop running.
