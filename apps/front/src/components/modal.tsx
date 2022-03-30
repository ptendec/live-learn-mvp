import clsx from "clsx";
import { useState } from "react";

type ModalProps = {
  open: boolean;
  promptText: string;
  onSubmit: (input: string) => void;
};

export const Modal = ({ open, promptText, onSubmit }: ModalProps) => {
  const [input, setInput] = useState("");

  return (
    <div className={clsx("modal ", open && "modal-open")}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{promptText}</h3>
        <div className="mt-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            type="text"
            placeholder="Type here"
            className="w-full input input-bordered"
          />
        </div>
        <div className="modal-action">
          <button className="btn" onClick={() => onSubmit(input)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
