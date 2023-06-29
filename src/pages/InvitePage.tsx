import { Component } from "solid-js";
import { InviteState, state } from "../App";

const InvitePage: Component = () => {
  return (
    <div class="flex flex-col h-fit min-h-screen justify-center items-center p-5 text-center">
      <div class="text-4xl max-w-lg mb-3">Your files are ready to send.</div>
      <div class="text-lg max-w-lg mb-6">
        Copy the link to share your files. Keep your <b>browser tab open</b> as
        your files are sent in real-time rather than being uploaded to a server.
      </div>

      <input
        type="text"
        placeholder="Type a name..."
        value={window.location.href + (state() as InviteState).id}
        readOnly
        class="max-w-lg mb-4 focus:border-[#9ea6b5] border rounded bg-transparent border-[#4a4f58] w-full py-4 px-3 text-white leading-tight focus:outline-none"
      />

      <button class="transition w-full max-w-lg font-bold bg-[#0060df] py-3 px-6 rounded hover:bg-[#2e75d1]">
        Copy link
      </button>
    </div>
  );
};

export default InvitePage;
