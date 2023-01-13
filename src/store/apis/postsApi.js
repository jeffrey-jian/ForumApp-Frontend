import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query({
        providesTags: (result, error, arg) => {
          const tags = result.payload.data.map((post) => {
            return { type: "Post", id: post.id };
          });
          tags.push("Feed")
          return tags;
        },
        query: (arg) => {
          return {
            url: "/posts",
            params: {
              type: arg.type,
            },
            method: "GET",
          };
        },
      }),
      addPost: builder.mutation({
        invalidatesTags: ["Feed"],
        query: ({ author_id, category, title, post_text }) => {
          console.log("Query received.");
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
      removePost: builder.mutation({}),
    };
  },
});

export const { useFetchPostsQuery, useAddPostMutation } = postsApi;
export { postsApi };
