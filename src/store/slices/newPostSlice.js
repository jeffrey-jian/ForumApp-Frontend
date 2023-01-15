import { createSlice } from "@reduxjs/toolkit";

const newPostSlice = createSlice({
  name: "createPost",
  initialState: {
    heading: "",
    category: "",
    title: "",
    text: "",
  },
  reducers: {
    changeHeading(state, action) {
      state.heading = action.payload;
    },
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

export const { changeHeading, changeCategory, changeTitle, changeText } = newPostSlice.actions;
export const newPostReducer = newPostSlice.reducer;
