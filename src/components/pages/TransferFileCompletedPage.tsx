import { Component } from "solid-js";

const TransferFileCompletedPage: Component = () => {
  return (
    <div class="flex flex-col h-fit min-dvh-screen justify-center items-center px-8 text-center">
      <svg
        class="w-28 h-28"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 125">
        <g transform="translate(0,-952.36218)">
          <path
            style="opacity:1;color:#000000;fill:#3bff55;stroke:none;stroke-width:7.09253644999999990;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;
          stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate"
            d="M 50 8 C 26.80404 8 8 26.80404 8 50 C 8 73.19596 26.80404 92 50 92 C 73.19596 92 92 73.19596 92 50 C 92 26.80404 73.19596 8 50 8 z M 71.1875 32.96875 A 
          2.0001995 2.0001995 0 0 1 72.6875 36.375 L 45.4375 64.375 A 2.0001995 2.0001995 0 0 1 42.5625 64.375 L 29.8125 51.28125 A 2.0001995 2.0001995 0 1 1 32.6875 
          48.5 L 44 60.125 L 69.8125 33.59375 A 2.0001995 2.0001995 0 0 1 71.1875 32.96875 z "
            transform="translate(0,952.36218)"
          />
        </g>
      </svg>
      <div class="text-4xl text-white">Transfer Completed</div>
      <div class="text-xl text-white max-w-lg mt-3 mb-5 text-center">
        The file transfer was completed successfully.
      </div>
    </div>
  );
};

export default TransferFileCompletedPage;
