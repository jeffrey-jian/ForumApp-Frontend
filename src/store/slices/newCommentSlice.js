import { createSlice } from "@reduxjs/toolkit";

const newCommentSlice = createSlice({
  name: "createComment",
  initialState: {
    text: "",
  },
  reducers: {
    changeCommentText(state, action) {
      state.text = action.payload;
    },
  },
});

export const { changeCommentText } = newCommentSlice.actions;
export const newCommentReducer = newCommentSlice.reducer;
