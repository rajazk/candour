import { createApi } from "@reduxjs/toolkit/query/react";
import { setUsers } from "store/slices";
import { IUser } from "store/types";
import customFetchBase from "./customFetchBase";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: customFetchBase,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser, number>({
      query(page) {
        return {
          url: `/users?page=${page}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const payload = (await queryFulfilled).data;
          dispatch(setUsers(payload));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = usersApi;
