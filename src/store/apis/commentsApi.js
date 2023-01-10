import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
  }),
  endpoints(builder) {
    return {
      fetchComments: builder.query({
        query: (post) => {
          return {
            url: '/comments',
            params: {
              post_id: post.id
            },
            method: "GET",
          };
        }
      })
    }
  }
});

export const { useFetchCommentsQuery } = commentsApi;
export { commentsApi };
