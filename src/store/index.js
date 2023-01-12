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
import { addComment, commentsReducer } from "./slices/commentsSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { commentsApi } from "./apis/commentsApi";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    newPost: newPostReducer,
    posts: postsReducer,
    comments: commentsReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(commentsApi.middleware);
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
  addComment,
};

export * from "./thunks/fetchPosts";
export { useFetchCommentsQuery, useAddCommentMutation } from './apis/commentsApi';
