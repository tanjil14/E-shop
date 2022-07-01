import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    //it have header and state parameter
    //state have getState func to get all //service which define in store
    //state.getState()
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      //hook
      // useAuthLoginMutation
      createCategory: builder.mutation({
        query: (categoryName) => {
          return {
            url: "create-category",
            method: "POST",
            body: categoryName,
          };
        },
      }),
    };
  },
});
export const { useCreateCategoryMutation } = categoryService;
export default categoryService;
