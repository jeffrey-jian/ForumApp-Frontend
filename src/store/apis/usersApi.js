import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

/**
 * methods:
 *  fetchUsers
 */


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
    };
  },
});

export const { useLazyFetchUserQuery } = usersApi;
export { usersApi };
