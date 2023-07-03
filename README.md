##

<p align="center">
    <img src='logo.svg?raw=true' width='50%'>
</p>

---

Share is a real-time, peer-to-peer file transfer platform with a focus on security. With Share, you can send files of any size, and you can have peace of mind knowing that your files will be sent using end-to-end encryption and will never be stored on any server.

## [Try it out](https://share.vldr.org/)

You can try it out by clicking the above link.

## Building and Running

**Note:** The following instructions assume that you are in a terminal and are using a Unix based machine (Windows Subsystem, Linux, etc).

### Building

1. Install [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/).
2. Run `npm i`
3. Run `npm run build`

After the build process completes, the output files will be located in the `dist/` directory.

### Running

**Note:** In a local development environment, you will need to have a local instance of [Relay](https://github.com/vldr/Relay) running. Additionally, you will need to change the WebSocket address in the `.env.development` file to point to the address of your local Relay instance.

1. Install [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/).
2. Run `npm i`
3. Run `npm run dev`
4. Press `Control + C` to stop running.

After the build process completes, the output files will be located in the `dist/` directory.
