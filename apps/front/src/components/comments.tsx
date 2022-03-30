import { memo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Comment } from "./comment";

type CommentListProps = {
  comments: { body: string; id: number; timecode: number; userId: string }[];
};

export const CommentList = memo(({ comments }: CommentListProps) => {
  const timecode = useSelector((state: RootState) => state.video.currentTime);

  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastElementRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment, index, array) => {
        return (
          timecode >= comment.timecode && (
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
      <div ref={lastElementRef} />
    </ul>
  );
});
