import clsx from "clsx";
import { useState } from "react";

type InputProps = {
  onSend: (input: string) => void;
  disabled: boolean;
  isLoading: boolean;
};

export const Input = ({ onSend, disabled, isLoading }: InputProps) => {
  const [text, setText] = useState("");

  return (
    <label className="z-10 h-12 input-group">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className={clsx(
          "w-full rounded-none resize-none textarea textarea-bordered",
          disabled && "textarea-disabled"
        )}
        placeholder="Send a comment"
        disabled={disabled}
      />
      <button
        className={clsx(
          "btn",
          isLoading && "loading",
          disabled && "btn-disabled"
        )}
        disabled={disabled}
        onClick={() => text.length && (onSend(text), setText(""))}
      >
        Send
      </button>
    </label>
  );
};
