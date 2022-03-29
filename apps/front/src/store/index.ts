import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: { video: videoReducer, user: userReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
