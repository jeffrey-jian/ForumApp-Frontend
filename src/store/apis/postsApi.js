import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:8000",
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query({
        query: (type) => {
          return {
            url: "/posts",
            params: {
              type: type,
            },
            method: "GET",
          };
        },
      }),
      // addPost: builder.query({}),
      // editPost: builder.query({}),
      // removePost: builder.query({}),
    };
  },
});

export const { useFetchPostsQuery } = postsApi;
export { postsApi };
