import { createSlice, nanoid } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    addPost(state, action) {
      state.posts.push({
        id: nanoid(),
        author_id: action.payload.author_id,
        date_created: action.payload.date_created,
        category: action.payload.category,
        title: action.payload.title,
        text: action.payload.text,
        comments: action.payload.comments,
      });
    },
    addComment(state, action) {
      state.posts
        .find((post) => post.id === action.payload.post_id)
        .comments.push({
          id: nanoid(),
          author_id: action.payload.author_id,
          date_created: action.payload.date_created,
          text: action.payload.text,
        });
    },
  },
});

export const { addPost, addComment } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
