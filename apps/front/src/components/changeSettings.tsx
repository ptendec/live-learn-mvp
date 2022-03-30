import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../features/user/userSlice";
import { setVideoId } from "../features/video/videoSlice";
import { Modal } from "./modal";

export const ChangeSettings = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const dispatch = useDispatch();

  const onSubmitVideo = (input: string) => {
    if (input.length > 0) {
      dispatch(setVideoId(input));
    }
    setVideoModalOpen(false);
  };

  const onSubmitName = (input: string) => {
    if (input.length > 0) {
      dispatch(setUserName(input));
    }
    setNameModalOpen(false);
  };

  const changeName = () => {
    setNameModalOpen(true);
  };

  const changeVideo = () => {
    setVideoModalOpen(true);
  };
  return (
    <>
      <Modal
        open={videoModalOpen}
        promptText="Enter youtube video id"
        onSubmit={onSubmitVideo}
      />
      <Modal
        open={nameModalOpen}
        promptText="Enter new username"
        onSubmit={onSubmitName}
      />
      <div className="flex btn-group">
        <button
          className="flex-1 btn hover:btn-active"
          onClick={() => changeVideo()}
        >
          Change video
        </button>
        <button
          className="flex-1 btn hover:btn-active"
          onClick={() => changeName()}
        >
          Change name
        </button>
      </div>
    </>
  );
};
