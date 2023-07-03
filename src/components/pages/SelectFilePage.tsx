import { Component, createSignal } from "solid-js";

const SelectFilePage: Component<{
  selectFiles: (fileList: FileList) => void;
}> = (props) => {
  const [highlight, setHighlight] = createSignal(false);

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      props.selectFiles(target.files);
    }
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        props.selectFiles(event.dataTransfer.files);
      }
    }
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();

    setHighlight(true);
  };

  const onDragLeave = (event: any) => {
    if (
      event.target === dropElement &&
      !dropElement?.contains(event.fromElement)
    ) {
      setHighlight(false);
    }
  };

  const onClick = () => {
    inputElement?.click();
  };

  let inputElement: HTMLInputElement | undefined;
  let dropElement: HTMLDivElement | undefined;

  return (
    <div class="flex h-fit min-dvh-screen justify-center md:items-center items-start">
      <div class="flex flex-col-reverse dvh-screen md:h-fit md:flex-row max-w-[53rem] bg-[#23272c] shadow-lg rounded-md overflow-hidden text-center">
        <div
          class="flex flex-col items-center justify-center h-full border-2 border-dashed rounded-md border-[#64676e] px-[100px] py-[150px]"
          ref={dropElement}
          style={highlight() ? { "border-color": "whitesmoke" } : {}}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 mb-3"
            fill="#fff"
            viewBox="0 0 32 32">
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
            Select files to share
          </button>

          <input
            style={{ display: "none" }}
            ref={inputElement}
            onChange={onChange}
            multiple
            type="file"
          />
        </div>
        <div class="flex flex-col bg-[#101214] pb-7 w-full md:pb-0 md:w-[21rem]">
          <div class="flex flex-row m-7 mb-6 items-center">
            <div class="bg-[#0060df] h-14 w-14 p-1 rounded-lg mr-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 45">
                <path
                  fill="#fff"
                  d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm9.57,18.18C24.45,21.85,18,24.89,14.5,26.57A3.6,3.6,0,0,1,13,26.9a3.45,3.45,0,
                  0,1-2-.63,3.78,3.78,0,0,1-1.6-3.13V21.43h2.29v1.71a1.52,1.52,0,0,0,.62,1.26,1.2,1.2,0,0,0,1.19.1c3.53-1.67,9.9-4.7,13-6.33a.21.21,0,
                  0,0,0-.32c-3.1-1.66-9.46-4.69-13-6.34a1.19,1.19,0,0,0-1.2.1,1.51,1.51,0,0,0-.62,1.26v2.74a1.13,1.13,0,0,0,1.05,1.25h2.38v2.29H12.77a3.41,
                  3.41,0,0,1-3.34-3.53V12.87A3.77,3.77,0,0,1,11,9.74a3.42,3.42,0,0,1,3.47-.29c3.53,1.66,9.93,4.71,13.06,6.38a2.48,2.48,0,0,1,0,
                  4.35Zm-10.14-1V16.86h2.29v2.29Z"
                />
              </svg>
            </div>
            <div class="text-5xl font-bold mb-[5px] select-none text-white">
              Share
            </div>
          </div>
          <div class="mx-7 text-gray-300 text-justify">
            Share is a real-time, peer-to-peer file transfer platform with a
            focus on security. With Share, you can send files of any size, and
            you can have peace of mind knowing that your files will be sent
            using end-to-end encryption and will never be stored on any server.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFilePage;