import { Component, Show } from "solid-js";
import { ErrorState, state } from "../App";
import Error from "../assets/error.svg";

const ErrorPage: Component = () => {
  const onRetryClick = () => {
    location.reload();
  };

  const onGoBackClick = () => {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );

    location.reload();
  };

  return (
    <div class="flex flex-col h-fit min-h-screen justify-center items-center p-5">
      <img class="w-32 h-32 mb-[-20px]" src={Error} />
      <div class="text-4xl text-white">Error</div>
      <div class="text-xl text-white max-w-lg mt-3 mb-5 text-center">
        {(state() as ErrorState).message}
      </div>
      <div class="flex flex-row">
        <Show
          when={location.hash}
          fallback={
            <button
              onClick={onRetryClick}
              class="transition border w-fit font-bold border-[#4a4f58] py-2 px-6 rounded hover:bg-[#292e34] mr-2">
              Retry
            </button>
          }>
          <button
            onClick={onGoBackClick}
            class="transition border w-fit font-bold border-[#4a4f58] py-2 px-6 rounded hover:bg-[#292e34] mr-2">
            Go Back
          </button>

          <button
            onClick={onRetryClick}
            class="transition w-fit font-bold border-[#4a4f58] py-2 px-4 rounded hover:bg-[#292e34]">
            Retry
          </button>
        </Show>
      </div>
    </div>
  );
};

export default ErrorPage;
