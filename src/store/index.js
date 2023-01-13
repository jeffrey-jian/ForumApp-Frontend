import { configureStore } from "@reduxjs/toolkit";
import {
  currentUserReducer,
  logIn,
  logOut,
  changeUser,
} from "./slices/currentUserSlice";
import {
  newPostReducer,
  changeCategory,
  changeTitle,
  changeText,
} from "./slices/newPostSlice";
import { postsReducer, addPost } from "./slices/postsSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { commentsApi } from "./apis/commentsApi";
import { postsApi } from "./apis/postsApi";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    newPost: newPostReducer,
    posts: postsReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    // [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(commentsApi.middleware)
      .concat(postsApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  logIn,
  logOut,
  changeUser,
  changeCategory,
  changeTitle,
  changeText,
  addPost,
};

export * from "./thunks/fetchPosts";
export {
  useFetchCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useRemoveCommentMutation,
} from "./apis/commentsApi";
