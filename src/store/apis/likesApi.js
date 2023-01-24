import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const likesApi = createApi({
  reducerPath: "likes",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jeffrey-forum-app.herokuapp.com/",
  }),
  endpoints(builder) {
    return {
      fetchLikesByPost: builder.query({
        providesTags: (result, error, post_id) => {
          const tags = result.payload.data.map((like) => {
            return { type: "Like", id: like.id };
          });
          tags.push({ type: "PostsLikes", id: post_id });
          return tags;
        },
        query: (post_id) => {
          return {
            url: "/likes",
            params: {
              post_id: post_id,
            },
            method: "GET",
          };
        },
      }),
      addLike: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "PostsLikes", id: arg.post.id }];
        },
        query: ({ user, post }) => {
          return {
            method: "POST",
            url: "/likes",
            body: {
              user_id: user.id,
              post_id: post.id,
            },
          };
        },
      }),
      removeLike: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Like", id: arg.id }];
        },
        query: (likeData) => {
          return {
            method: "DELETE",
            url: `/likes/${likeData.id}`,
          };
        },
      }),
    };
  },
});

export const {
  useFetchLikesByPostQuery,
  useAddLikeMutation,
  useRemoveLikeMutation,
} = likesApi;
export { likesApi };
