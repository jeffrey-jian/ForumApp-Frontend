import { createSlice } from "@reduxjs/toolkit";

const newPostSlice = createSlice({
  name: "createPost",
  initialState: {
    category: "",
    title: "",
    text: "",
  },
  reducers: {
    changeCategory(state, action) {
      state.category = action.payload;
    },
    changeTitle(state, action) {
      state.title = action.payload;
    },
    changeText(state, action) {
      state.text = action.payload;
    },
  },
});

export const { changeCategory, changeTitle, changeText } = newPostSlice.actions;
export const newPostReducer = newPostSlice.reducer;
