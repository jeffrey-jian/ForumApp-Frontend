import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentsApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints(builder) {
    return {
      addComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log("addComment tag:", { type: "Comment", post_id: arg.post_id });
          return [{ type: "Comment", id: arg.post_id }];
        },
        query: ({ author_id, post_id, comment_text }) => {
          return {
            url: "/comments",
            method: "POST",
            body: {
              author_id: author_id,
              comment_text: comment_text,
              post_id: post_id,
            },
          };
        },
      }),
      fetchComments: builder.query({
        providesTags: (result, error, post_id) => {
          console.log("fetchComments tag:", { type: "Comment", post_id: post_id });
          return [{ type: "Comment", id: post_id }];
        },
        query: (post_id) => {
          return {
            url: "/comments",
            params: {
              post_id: post_id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchCommentsQuery, useAddCommentMutation } = commentsApi;
export { commentsApi };
