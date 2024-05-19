import { Component, Show, createSignal } from "solid-js";
import QRCode from "qrcode";

const InvitePage: Component<{ multiple: boolean }> = (props) => {
  const [url] = createSignal<string>(window.location.href);
  const [QR, setQR] = createSignal<string>();
  const [visible, setVisible] = createSignal<boolean>(true);
  const [copied, setCopied] = createSignal<boolean>(false);

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const onShow = () => {
    setVisible(true);
  };

  const onHide = () => {
    setVisible(false);
  };

  QRCode.toDataURL(window.location.href, { width: 270 }).then((url) => {
    setQR(url);
  });

  return (
    <div class="flex flex-row h-fit min-dvh-screen justify-center items-center p-8 py-4 pb-12 gap-8">
      <div class="flex flex-col text-center">
        <Show
          when={visible()}
          fallback={
            <div class="flex flex-col justify-censter items-center max-w-[270px]">
              <img class="rounded" src={QR()} />
              <button
                onClick={onShow}
                class="transition flex justify-center items-center font-bold text-md mt-4 text-gray-400 hover:text-gray-200">
                <svg
                  class="mr-2"
                  stroke="currentColor"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  viewBox="0 0 384 384">
                  <path
                    d="m373.5 322.6l-130.6-130.6 130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9
                     0l-130.6 130.6-130.6-130.6c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9l130.6 
                     130.6-130.6 130.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0l130.6-130.6 130.6
                     130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z"
                  />
                </svg>
                Close
              </button>
            </div>
          }>
          <div
            class="text-4xl max-w-lg mb-1"
            style={{ position: "relative", top: "-8px" }}>
            Your {props.multiple ? "files are" : "file is"} ready to send
          </div>
          <div class="text-lg max-w-lg mb-6 text-justify">
            Copy the link below to share your{" "}
            {props.multiple ? "files" : "file"}. Do not close your{" "}
            <b>browser tab</b>, as data will be sent in real-time instead of
            being uploaded to a server.
          </div>

          <input
            type="text"
            placeholder="Type a name..."
            value={url()}
            readOnly
            class="max-w-lg mb-4 focus:border-[#9ea6b5] border rounded bg-transparent border-[#4a4f58] w-full py-4 px-3 text-white leading-tight focus:outline-none"
          />

          <div class="flex flex-row gap-1">
            <button
              onClick={onCopyToClipboard}
              class="transition w-full max-w-lg font-bold py-3 px-6 rounded bg-[#0060df] hover:bg-[#2e75d1]">
              <Show when={copied()} fallback={"Copy link"}>
                Copied!
              </Show>
            </button>

            <button
              onClick={onHide}
              class="transition md:hidden py-3 px-3 rounded bg-[#0060df] hover:bg-[#2e75d1]">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                height="2em"
                width="2em">
                <path
                  d="M468 128H160c-17.7 0-32 14.3-32 32v308c0 4.4 3.6 8 8 8h332c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8zm-56 
                  284H192V192h220v220zm-138-74h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm194
                  210H136c-4.4 0-8 3.6-8 8v308c0 17.7 14.3 32 32 32h308c4.4 0 8-3.6 8-8V556c0-4.4-3.6-8-8-8zm-56 284H192V612h220v220zm-138-74h56c4.4
                  0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm590-630H556c-4.4 0-8 3.6-8 8v332c0 4.4 
                  3.6 8 8 8h332c4.4 0 8-3.6 8-8V160c0-17.7-14.3-32-32-32zm-32 284H612V192h220v220zm-138-74h56c4.4 0 8-3.6 
                  8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm194 210h-48c-4.4 0-8 3.6-8 8v134h-78V556c0-4.4-3.6-8-8-8H556c-4.4
                  0-8 3.6-8 8v332c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h78v102c0 4.4 3.6 8 8 8h190c4.4 0 8-3.6 8-8V556c0-4.4-3.6-8-8-8zM746
                  832h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm142 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4
                  3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </button>
          </div>
        </Show>
      </div>

      <Show when={visible()}>
        <img class="rounded md:block hidden" src={QR()} />
      </Show>
    </div>
  );
};

export default InvitePage;
