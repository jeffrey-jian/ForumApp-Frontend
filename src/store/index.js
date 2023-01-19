import { configureStore } from "@reduxjs/toolkit";
import {
  currentUserReducer,
  logIn,
  logOut,
  changeUser,
} from "./slices/currentUserSlice";
import {
  newPostReducer,
  changeHeading,
  changeCategory,
  changeTitle,
  changeText,
} from "./slices/newPostSlice";
import { feedPostsReducer, filterBy } from "./slices/feedPostsSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { commentsApi } from "./apis/commentsApi";
import { postsApi } from "./apis/postsApi";
import { usersApi } from "./apis/usersApi";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    newPost: newPostReducer,
    feedPosts: feedPostsReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(commentsApi.middleware)
      .concat(postsApi.middleware)
      .concat(usersApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  logIn,
  logOut,
  changeUser,
  changeHeading,
  filterBy,
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
export {
  useFetchPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useRemovePostMutation,
} from "./apis/postsApi";
export { useLazyFetchUserQuery, useAddUserMutation } from "./apis/usersApi";
