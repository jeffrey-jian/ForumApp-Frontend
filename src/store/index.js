import { configureStore } from "@reduxjs/toolkit";
import {
  currentUserReducer,
  logIn,
  logOut,
  changeUser,
} from "./slices/currentUserSlice";
import { newCommentReducer, changeCommentText } from "./slices/newCommentSlice";
import {
  newPostReducer,
  changeCategory,
  changeTitle,
  changeText,
} from "./slices/newPostSlice";
import { postsReducer, addPost, addComment } from "./slices/postsSlice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    newPost: newPostReducer,
    posts: postsReducer,
    newComment: newCommentReducer,
  },
});

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
  changeCommentText,
};
