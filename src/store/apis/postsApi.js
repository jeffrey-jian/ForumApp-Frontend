import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { type } from "@testing-library/user-event/dist/type";

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
          return tags;
        },
        query: (type) => {
          return {
            url: "/posts",
            params: {
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchPostsQuery } = postsApi;
export { postsApi };
