import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentsApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints(builder) {
    return {
      fetchComments: builder.query({
        providesTags: (result, error, post_id) => {
          const tags = result.payload.data.map((comment) => {
            return { type: "Comment", id: comment.id };
          });
          tags.push({ type: "PostsComments", id: post_id });
          return tags;
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
      addComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "PostsComments", id: arg.post_id }];
        },
        query: ({ author_id, post_id, comment_text }) => {
          return {
            method: "POST",
            url: "/comments",
            body: {
              author_id: author_id,
              comment_text: comment_text,
              post_id: post_id,
            },
          };
        },
      }),
      editComment: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Comment", id: arg.comment_id }];
        },
        query: ({comment_id, comment_text}) => {
          return {
            method: "PUT",
            url: `/comments/${comment_id}`,
            body: {
              comment_id: comment_id,
              comment_text: comment_text,
            }
          };
        },
      }),
      removeComment: builder.mutation({
        invalidatesTags: (result, error, comment_id) => {
          return [{ type: "Comment", id: comment_id }];
        },
        query: (comment_id) => {
          return {
            method: "DELETE",
            url: `/comments/${comment_id}`,
          };
        },
      }),
    };
  },
});

export const {
  useFetchCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useRemoveCommentMutation,
} = commentsApi;
export { commentsApi };
