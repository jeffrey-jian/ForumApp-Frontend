import { createSlice, nanoid } from "@reduxjs/toolkit";


const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // changed to action.payload.DATA.{...}
    addComment(state, action) {
      state.posts
        .find((post) => post.id === action.payload.data.post_id)
        .comments.push({
          id: nanoid(),
          author_id: action.payload.author_id,
          date_created: action.payload.date_created,
          text: action.payload.text,
        });
    },
  },
});

export const { addComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;