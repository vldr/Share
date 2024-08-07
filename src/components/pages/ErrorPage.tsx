import { Component, Match, Show, Switch } from "solid-js";

const ErrorPage: Component<{ message: string }> = (props) => {
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
    <div class="flex flex-col h-fit min-dvh-screen justify-center items-center px-8 py-4 text-center">
      <svg class="w-32 h-32 mb-[-20px]" viewBox="0 0 100 125.0125">
        <path
          fill="#ff3b3b"
          d="M50,14.57A35.44,35.44,0,1,0,85.43,50,35.47,35.47,0,0,0,50,14.57Zm-1.74,15.1a1.74,1.74,0,0,1,3.48,0V57.6a1.74,1.74,0,0,1-3.48,0ZM50,71a3.08,3.08,0,1,1,3.07-3.08A3.07,3.07,0,0,1,50,71Z"
        />
      </svg>
      <div class="text-4xl text-white">Error</div>
      <div class="text-xl text-white max-w-lg mt-3 mb-5 text-center">
        <Switch fallback={props.message}>
          <Match when={props.message == "DoesNotExist"}>
            The link you entered is not valid.
          </Match>

          <Match when={props.message == "IsFull"}>
            The link you entered cannot be joined because the session is full.
          </Match>
        </Switch>
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
            Return to Home
          </button>
        </Show>
      </div>
    </div>
  );
};

export default ErrorPage;
