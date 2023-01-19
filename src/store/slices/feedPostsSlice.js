import { createSlice } from "@reduxjs/toolkit";

const feedPostsSlice = createSlice({
  name: "feedPosts",
  initialState: {
    filter: ""
  },
  reducers: {
    filterBy(state, action) {
      state.filter = action.payload;
    }
  }
})

export const { filterBy } = feedPostsSlice.actions;
export const feedPostsReducer = feedPostsSlice.reducer;