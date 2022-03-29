import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  currentTime: number;
  isPlaying: boolean;
  isReady: boolean;
  videoId: string;
}

const initialState: CounterState = {
  currentTime: 0,
  isPlaying: false,
  isReady: false,
  videoId: "BHYgpbPC4wM",
};

export const counterSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = Math.floor(action.payload);
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    setVideoId: (state, action: PayloadAction<string>) => {
      state.videoId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentTime, setIsPlaying, setIsReady, setVideoId } =
  counterSlice.actions;

export default counterSlice.reducer;
