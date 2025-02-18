import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

// Base query setup
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/product`, // Make sure getBaseUrl() returns the correct URL
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// API slice
const productsApi = createApi({
  reducerPath: "productsApi", // Corrected the typo here
  baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => "/",
      providesTags: ["Product"], // Corrected placement here
    }),
  }),
});

// Export the hook for the query
export const { useFetchAllProductsQuery } = productsApi;

export default productsApi;
