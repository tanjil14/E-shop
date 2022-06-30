import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
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
