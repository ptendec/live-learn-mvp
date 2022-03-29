import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube";
import {
  setCurrentTime,
  setIsPlaying,
  setIsReady,
} from "../features/video/videoSlice";

export const Video = ({ videoId }: { videoId: string }) => {
  const videoRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      dispatch(
        setCurrentTime(
          await videoRef.current.getInternalPlayer().getCurrentTime()
        )
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <YouTube
        className={"w-full h-screen"}
        ref={videoRef}
        videoId={videoId}
        onPlay={() => dispatch(setIsPlaying(true))}
        onPause={() => dispatch(setIsPlaying(false))}
        onReady={() => dispatch(setIsReady(true))}
      />
    </>
  );
};
