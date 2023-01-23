import { createSlice } from "@reduxjs/toolkit";

const feedPostsSlice = createSlice({
  name: "feedPosts",
  initialState: {
    filter: "all",
    searchTerm: "",
  },
  reducers: {
    filterBy(state, action) {
      state.filter = action.payload;
    },
    searchBy(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { filterBy, searchBy } = feedPostsSlice.actions;
export const feedPostsReducer = feedPostsSlice.reducer;
