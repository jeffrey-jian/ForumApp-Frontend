import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jeffrey-forum-app.herokuapp.com/",
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.query({
        query: (loginInfo) => {
          return {
            url: `/users`,
            params: {
              username: loginInfo.username,
              avatarColor: loginInfo.avatarColor,
            },
            method: "GET",
          };
        },
      }),
      // loginUser: builder.mutation({
      //   query: (loginInfo) => {
      //     return {
      //       method: "POST",
      //       url: "users",
      //       body: {
      //         username: loginInfo.username,
      //       },
      //     };
      //   },
      // }),
      // addUser: builder.mutation({
      //   query: (newUserInfo) => {
      //     return {
      //       method: "POST",
      //       url: "users",
      //       body: {
      //         username: newUserInfo.username,
      //       },
      //     };
      //   },
      // }),
    };
  },
});

export const { useLazyFetchUserQuery, useAddUserMutation } = usersApi;
export { usersApi };
