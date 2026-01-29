import { useState } from "preact/hooks";

export type MessageInputProps = {
  onSubmit: (message: string) => void;
};

export function MessageInput({ onSubmit }: MessageInputProps) {
  const [message, setMessage] = useState("");

  return (
    <div className="relative w-full mt-auto px-2 mb-2 flex-none">
      <textarea
        value={message}
        placeholder="Enter message"
        className="textarea textarea-lg w-full rounded-lg field-sizing-content resize-none"
        onInput={(e) => setMessage(e.currentTarget.value)}
      />
      <button
        type="button"
        className="absolute right-4 bottom-2 btn btn-sm btn-circle btn-accent"
        aria-label="Submit"
        onClick={() => {
          onSubmit(message);
          setMessage("");
        }}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
}
