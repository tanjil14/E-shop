import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => {
    return {
      //hook
      // useAuthLoginMutation
      authLogin: builder.mutation({
        query: (LoginData) => {
          return {
            url: "login",
            method: "POST",
            body: LoginData,
          };
        },
      }),
    };
  },
});
export const { useAuthLoginMutation } = authService;
export default authService;
