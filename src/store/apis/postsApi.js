import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

/**
 * methods:
 *  fetchPosts
 *  addPosts
 *  editPosts
 *  removePosts
 */


const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jeffrey-forum-app.herokuapp.com/",
  }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query({
        providesTags: (result, error, conditions) => {
          var tags = [];
          if (result) {
            tags = result.payload.data.map((post) => {
              return { type: "Post", id: post.id };
            });
          }

          // for (var key in conditions) {
          //   tags.push({type: key, id: conditions[key]})
          // }
          tags.push("Feed");
          return tags;
        },
        query: (conditions) => {
          return {
            url: "/posts",
            params: {
              filter: conditions.filter,
              searchTerm: conditions.searchTerm,
              author: conditions.author,
              likedBy: conditions.likedBy,
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
      editPost: builder.mutation({
        invalidatesTags: (result, error, post) => {
          return [{ type: "Post", id: post.id }];
        },
        query: (post) => {
          return {
            method: "PUT",
            url: `/posts/${post.id}`,
            body: {
              id: post.id,
              category: post.category,
              title: post.title,
              post_text: post.post_text,
            }
          }
        }
      }),
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
