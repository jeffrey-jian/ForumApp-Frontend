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

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { commentsApi } from "./apis/commentsApi";
import { postsApi } from "./apis/postsApi";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    newPost: newPostReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(commentsApi.middleware)
      .concat(postsApi.middleware);
  },
});

setupListeners(store.dispatch);

console.log("postsApi", postsApi);
console.log("commentsApi", commentsApi);

export {
  store,
  logIn,
  logOut,
  changeUser,
  changeCategory,
  changeTitle,
  changeText,
};

export {
  useFetchCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useRemoveCommentMutation,
} from "./apis/commentsApi";
export { useFetchPostsQuery, useAddPostMutation } from "./apis/postsApi";