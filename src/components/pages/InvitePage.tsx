import { Component, Show, createSignal } from "solid-js";
import QRCode from "qrcode";

const InvitePage: Component = () => {
  const [copied, setCopied] = createSignal<boolean>(false);
  const [QR, setQR] = createSignal<string>();

  const onClick = () => {
    navigator.clipboard.writeText(window.location.href);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  QRCode.toDataURL(window.location.href, { width: 270 }).then((url) => {
    setQR(url);
  });

  return (
    <div class="flex flex-row h-fit min-dvh-screen justify-center items-center px-8 gap-8">
      <div class="flex flex-col text-center">
        <div
          class="text-4xl max-w-lg mb-1"
          style={{ position: "relative", top: "-10px" }}>
          Your file(s) are ready to send
        </div>
        <div class="text-lg max-w-lg mb-6">
          Copy the link to share your file(s). Keep your <b>browser tab open</b>{" "}
          as data will be sent in real-time rather than being uploaded onto a
          server.
        </div>

        <input
          type="text"
          placeholder="Type a name..."
          value={window.location.href}
          readOnly
          class="max-w-lg mb-4 focus:border-[#9ea6b5] border rounded bg-transparent border-[#4a4f58] w-full py-4 px-3 text-white leading-tight focus:outline-none"
        />

        <button
          onClick={onClick}
          class="transition w-full max-w-lg font-bold bg-[#0060df] py-3 px-6 rounded hover:bg-[#2e75d1]">
          <Show when={copied()} fallback={"Copy link"}>
            Copied!
          </Show>
        </button>
      </div>

      <Show when={QR()}>
        <img class="rounded md:block hidden" src={QR()} />
      </Show>
    </div>
  );
};

export default InvitePage;
