import { Component } from "solid-js";
import Logo from "../../assets/logo.svg";

const SelectFilePage: Component<{
  selectFiles: (fileList: FileList) => void;
}> = (props) => {
  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.files) {
      props.selectFiles(target.files);
    }
  };

  const onClick = () => {
    inputElement?.click();
  };

  let inputElement: HTMLInputElement | undefined;

  return (
    <div class="flex h-fit min-h-screen justify-center md:items-center items-start">
      <div class="flex flex-col-reverse md:flex-row max-w-[53rem] bg-[#23272c] shadow-lg rounded-md overflow-hidden text-center">
        <div class="flex-col">
          <div class="flex flex-col items-center justify-center border-2 border-dashed rounded-md border-[#64676e] px-[100px] py-[150px]">
            <svg class="h-10 w-10 mb-3" fill="#fff" viewBox="0 0 32 32">
              <path
                d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 
                14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 
                0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
            </svg>
            <div class="text-2xl w-max">Drag and drop files</div>
            <div class="text-l w-max mb-6">or click to select files</div>

            <button
              onClick={onClick}
              class="transition w-fit font-bold bg-[#0060df] py-3 px-6 rounded hover:bg-[#2e75d1] mr-2">
              Select files to upload
            </button>

            <input
              style={{ display: "none" }}
              ref={inputElement}
              onChange={onChange}
              multiple
              type="file"
            />
          </div>
        </div>
        <div class="flex flex-col bg-[#101214] pb-7 w-full md:pb-0 md:w-[21rem]">
          <div class="flex flex-row m-7 mb-6 items-center">
            <div class="bg-[#0060df] h-14 w-14 p-1 rounded-lg mr-5">
              <img class="invert" src={Logo} />
            </div>
            <div class="text-5xl font-bold mb-[5px] select-none text-white">
              Share
            </div>
          </div>
          <div class="mx-7 text-gray-300 text-justify">
            A real-time, peer-to-peer file transfer application allows you to
            send files of any size by simply selecting your files and sending a
            link. Your files are sent in real-time and are not stored on any
            server. No sign-ups are required.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFilePage;
