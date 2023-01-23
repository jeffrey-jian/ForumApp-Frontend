import { createSlice } from "@reduxjs/toolkit";

const feedPostsSlice = createSlice({
  name: "feedPosts",
  initialState: {
    filter: "All",
    searchTerm: "",
    author: "",
    likedBy: "",
  },
  reducers: {
    filterBy(state, action) {
      state.filter = action.payload;
      state.searchTerm = "";
      state.author = "";
      state.likedBy = "";
    },
    searchBy(state, action) {
      state.searchTerm = action.payload;
      state.filter = "All";
      state.author = "";
      state.likedBy = "";
    },
    myPosts(state, action) {
      state.author = action.payload;
      state.filter = "All";
      state.searchTerm = "";
      state.likedBy = "";
    },
    myLikes(state, action) {
      state.likedBy = action.payload;
      state.filter = "All";
      state.searchTerm = "";
      state.author = "";
    }
  },
});

export const { filterBy, searchBy, myPosts, myLikes } = feedPostsSlice.actions;
export const feedPostsReducer = feedPostsSlice.reducer;
