import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query({
        providesTags: (result, error, post) => {
          const tags = result.payload.data.map((post) => {
            return { type: "Post", id: post.id };
          });
          tags.push("Feed");
          return tags;
        },
        query: (filter) => {
          return {
            url: "/posts",
            params: {
              filter: filter,
            },
            method: "GET",
          };
        },
      }),
      addPost: builder.mutation({
        invalidatesTags: ["Feed"],
        query: ({ author_id, category, title, post_text }) => {
          return {
            method: "POST",
            url: "/posts",
            body: {
              author_id: author_id,
              category: category,
              title: title,
              post_text: post_text,
            },
          };
        },
      }),
      editPost: builder.mutation({}),
      removePost: builder.mutation({
        invalidatesTags: (result, error, post) => {
          return [{ type: "Post", id: post.id }];
        },
        query: (post) => {
          return {
            method: "DELETE",
            url: `/posts/${post.id}`,
          };
        },
      }),
    };
  },
});

export const {
  useFetchPostsQuery,
  useAddPostMutation,
  useRemovePostMutation,
  useEditPostMutation,
} = postsApi;
export { postsApi };
