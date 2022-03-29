import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Video } from "../components/video";
import { setUserName } from "../features/user/userSlice";
import { setVideoId } from "../features/video/videoSlice";
import { RootState } from "../store";
import { trpc } from "../utils/trpc";

type CommentProps = {
  url?: string;
  author: string;
  text: string;
  timecode?: number;
};

const Comment = ({ url, author, text }: CommentProps) => {
  return (
    <a href={url}>
      <div className="card card-compact bg-base-200 card-bordered">
        <div className="card-body">
          <h4 className="text-sm card-title">{author}</h4>
          <p className="line-clamp-2">{text}</p>
        </div>
      </div>
    </a>
  );
};

type InputProps = {
  onSend: (input: string) => void;
};

const Input = ({ onSend }: InputProps) => {
  const [text, setText] = useState("");

  return (
    <label className="z-10 h-12 input-group">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="w-full rounded-none resize-none textarea textarea-bordered"
        placeholder="Send a comment"
      />
      <button className="btn" onClick={() => (onSend(text), setText(""))}>
        Send
      </button>
    </label>
  );
};

type ModalProps = {
  open: boolean;
  promptText: string;
  onSubmit: (input: string) => void;
};

const Modal = ({ open, promptText, onSubmit }: ModalProps) => {
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

const ChangeSettings = () => {
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

type CommentListProps = {
  comments: { body: string; id: number; timecode: number; userId: string }[];
};

const CommentList = ({ comments }: CommentListProps) => {
  const timecode = useSelector((state: RootState) => state.video.currentTime);

  return (
    <ul className="space-y-4">
      {comments.map((comment) => {
        return (
          timecode > comment.timecode && (
            <li key={comment.id}>
              <Comment
                author={comment.userId}
                text={comment.body}
                timecode={comment.timecode}
              />
            </li>
          )
        );
      })}
    </ul>
  );
};

export const Index = () => {
  const utils = trpc.useContext();

  const video = useSelector((state: RootState) => state.video);
  const user = useSelector((state: RootState) => state.user);
  const commentQuery = trpc.useQuery([
    "comments.getAllByVideoId",
    video.videoId,
  ]);
  const commentMutation = trpc.useMutation("comments.send", {
    onSuccess() {
      utils.invalidateQueries("comments.getAllByVideoId");
    },
  });

  const sendText = (text: string) => {
    commentMutation.mutate({
      body: text,
      videoId: video.videoId,
      userId: user.name,
      timecode: video.currentTime,
    });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-[2]">
          <Video videoId={video.videoId} />
        </div>
        <div className="flex-[1] p-2 flex flex-col gap-4 h-screen">
          <div className="flex-auto overflow-y-auto ">
            {commentQuery.data ? (
              <CommentList comments={commentQuery.data} />
            ) : (
              "Loading"
            )}
          </div>
          <div className="p-2 space-y-2">
            <Input onSend={sendText} />
            <ChangeSettings />
          </div>
        </div>
      </div>
    </>
  );
};
