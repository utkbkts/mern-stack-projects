import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";
import postReducer from "./reducer/post.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
