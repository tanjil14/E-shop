import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productServices = createApi({
  reducerPath: "products",
  tagTypes: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation({
        
        query: (data) => {
          console.log(data)
          return {
            url: "create-product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
    };
  },
});
export const { useCreateProductMutation } = productServices;
export default productServices;
