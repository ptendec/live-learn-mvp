import { useSelector } from "react-redux";
import { ChangeSettings, CommentList, Input, Video } from "../components/";
import { RootState } from "../store";
import { trpc } from "../utils/trpc";

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
              <div className="flex items-center justify-center h-full">
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-primary animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          <div className="p-2 space-y-2">
            <Input
              onSend={sendText}
              isLoading={commentMutation.isLoading}
              disabled={commentMutation.isLoading}
            />
            <ChangeSettings />
          </div>
        </div>
      </div>
    </>
  );
};
