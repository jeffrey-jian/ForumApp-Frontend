import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchPosts } from "../thunks/fetchPosts";


const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // changed to action.payload.DATA.{...}
    addPost(state, action) {
      state.posts.push({
        // id: nanoid(),
        // author_id: action.payload.data.author_id,
        // date_created: action.payload.data.date_created,
        // category: action.payload.data.category,
        // title: action.payload.data.title,
        // text: action.payload.data.text,
        // comments: action.payload.data.comments,
      });
    },

  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
}); 

export const { addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

