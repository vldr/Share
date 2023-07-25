import { Component, For } from "solid-js";
import { SendFile, ReceiveFile } from "../Types";

const TransferFilePage: Component<{ files: (SendFile | ReceiveFile)[] }> = (
  props
) => {
  const humanReadableFileSize = (size: number): string => {
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));

    return (
      (size / Math.pow(1024, i)).toFixed(2) +
      " " +
      ["B", "KB", "MB", "GB", "TB"][i]
    );
  };

  return (
    <div class="flex flex-col h-fit min-dvh-screen justify-center items-center p-8 pb-12 text-center">
      <div class="text-4xl max-w-lg mb-3">Transferring file(s)</div>
      <div class="text-lg max-w-lg mb-6 px-3">
        Keep your <b>browser tab open</b> as data is sent in real-time.
      </div>
      <div class="flex flex-col gap-3 w-full items-center">
        <For each={props.files}>
          {(file) => (
            <div class="flex flex-col bg-[#23272c] shadow-lg rounded-md text-left p-4 w-full max-w-[500px]">
              <div class="flex flex-row">
                <div class="mr-2">
                  <svg class="w-12 h-12 invert" viewBox="0 0 100 100">
                    <path d="m79.46,22.56l-6.67-7.04-3.92-4.14c-.33-.35-.7-.62-1.1-.84-.23-.13-.48-.23-.73-.31-.07-.02-.13-.05-.2-.07h0s0,0,0,0v11.08c0,1.26.87,2.32,2.04,2.61.21.05.43.09.66.09h10.81s0,0,0,0h0c-.23-.51-.52-.99-.9-1.39Z" />
                    <path d="m27.79,10c-4.75,0-8.61,4.12-8.61,9.19v61.62c0,5.07,3.86,9.19,8.61,9.19h44.41c4.75,0,8.61-4.12,8.61-9.19V27.2h-11.26c-3.28,0-5.95-2.67-5.95-5.95v-11.25H27.79Zm4.58,17.57h17.62c.9,0,1.62.72,1.62,1.62s-.72,1.62-1.62,1.62h-17.62c-.9,0-1.62-.72-1.62-1.62s.72-1.62,1.62-1.62Zm35.24,44.86h-35.24c-.9,0-1.62-.72-1.62-1.62s.72-1.62,1.62-1.62h35.24c.9,0,1.62.72,1.62,1.62s-.72,1.62-1.62,1.62Zm0-24.05c.9,0,1.62.72,1.62,1.62s-.72,1.62-1.62,1.62h-35.24c-.9,0-1.62-.72-1.62-1.62s.72-1.62,1.62-1.62h35.24Z" />
                  </svg>
                </div>
                <div class="flex flex-col items-start break-all">
                  <div class="font-bold">{file.name}</div>
                  <div>{humanReadableFileSize(file.size)}</div>
                </div>
              </div>

              <div class="flex flex-col px-2">
                <div class="text-[#2f88fc] font-bold mb-1 mt-1">
                  {file.progress()}%
                </div>
                <div class="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                  <div
                    class="bg-[#2f88fc] h-1.5 rounded-full"
                    style={{ width: file.progress() + "%" }}></div>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default TransferFilePage;
