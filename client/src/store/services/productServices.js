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
          return {
            url: "create-product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      updateProduct: builder.mutation({
        query: (data) => {
          return {
            url: "update-product",
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      getProductsByPage: builder.query({
        query: (page) => {
          return {
            url: `products/${page}`,
            method: "GET",
          };
        },
        invalidatesTags: ["products"],
      }),
      getProductsById: builder.query({
        query: (id) => {
          return {
            url: `product/${id}`,
            method: "GET",
          };
        },
        invalidatesTags: ["products"],
      }),
    };
  },
});
export const {
  useCreateProductMutation,
  useGetProductsByPageQuery,
  useGetProductsByIdQuery,
  useUpdateProductMutation
} = productServices;
export default productServices;
