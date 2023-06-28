// import { Component, Match, Show, Switch, createSignal } from "solid-js";
// import { InfoState } from "../App";
// import DefaultProfilePicture from "../assets/profile_picture.svg";
// import Logo from "../assets/logo.svg";

// const InfoPage: Component<{ state: InfoState }> = (props) => {
//   const [error, setError] = createSignal<string>();

//   return (
//     <div class="flex h-fit min-h-screen justify-center md:items-center items-start">
//       <div class="flex flex-col-reverse md:flex-row max-w-[52rem] bg-[#23272c] shadow-lg rounded-md overflow-hidden">
//         <div class="flex-col">
//           <Show
//             when={error()}
//             fallback={
//               <Show when={props.state.type === "join"}>
//                 <div class="m-7 mb-4 bg-[#3d7ccf] px-4 py-3 rounded">
//                   You have been invited to join a room. Please fill out your
//                   information below and click the "Join Room" button.
//                 </div>
//               </Show>
//             }>
//             <div class="m-7 mb-4 bg-[#fa4a4a] px-4 py-3 rounded">{error()}</div>
//           </Show>

//           <div class="flex flex-row m-7 mb-0">
//             <img
//               class="h-32 w-32 mr-4 rounded-md"
//               src={profilePicture() || DefaultProfilePicture}
//             />
//             <div class="flex flex-col">
//               <div class="font-bold uppercase">Avatar</div>
//               <div class="font-normal text-gray-200 mb-3">
//                 The image others will see. Accepted formats: <b>PNG</b>,{" "}
//                 <b>JPEG</b>, and <b>GIF</b>, under {MAX_FILE_SIZE / 1000000} MB
//                 in size.
//               </div>

//               <div class="flex flex-row">
//                 <input
//                   style={{ display: "none" }}
//                   ref={pictureInputElement}
//                   onChange={onChooseFileChange}
//                   type="file"
//                   accept="image/png, image/jpeg, image/gif, image/jpg"
//                 />

//                 <button
//                   onClick={onChooseFileClick}
//                   class="transition border w-fit font-bold border-[#4a4f58] py-2 px-6 rounded hover:bg-[#292e34] mr-2">
//                   Choose File
//                 </button>

//                 <button
//                   onClick={onRemoveFileClick}
//                   class="transition w-fit font-bold border-[#4a4f58] py-2 px-4 rounded hover:bg-[#292e34]">
//                   Remove Avatar
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div class="flex flex-row m-7 mt-4">
//             <div class="flex flex-col w-full">
//               <div class="font-bold uppercase">Display Name</div>
//               <div class="font-normal text-gray-200 mb-3">
//                 The name others will use to recognize you, maximum{" "}
//                 {MAX_NAME_SIZE} characters long.
//               </div>
//               <input
//                 ref={nameInputElement}
//                 type="text"
//                 placeholder="Type a name..."
//                 class="mb-4 focus:border-[#9ea6b5] border rounded bg-transparent border-[#4a4f58] w-full py-3 px-3 text-white leading-tight focus:outline-none"
//               />
//               <button
//                 onClick={onSubmit}
//                 class="transition border w-fit font-bold border-[#4a4f58] py-2 px-6 rounded hover:bg-[#292e34] mr-2">
//                 <Switch>
//                   <Match when={props.state.type === "create"}>
//                     Create Room
//                   </Match>
//                   <Match when={props.state.type === "join"}>Join Room</Match>
//                 </Switch>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div class="flex flex-col bg-[#101214] pb-7 w-full md:pb-0 md:w-[30rem]">
//           <div class="flex flex-row m-7 mb-6 items-center">
//             <div class="bg-[#3a95fd] h-14 w-14 p-1 rounded-lg mr-5">
//               <img class="invert" src={Logo} />
//             </div>
//             <div class="text-5xl font-bold mb-[5px] select-none text-white">
//               Chatter
//             </div>
//           </div>
//           <div class="mx-7 text-gray-300 text-justify">
//             A real-time, peer-to-peer chat platform that prioritizes privacy
//             through end-to-end encryption. Conduct voice calls, chat with
//             friends, send files, and much more, all while keeping your data
//             private.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfoPage;
