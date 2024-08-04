import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.217.149:5000/products' }),
     // 
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (page = 1) => {
                return {
                    url: "/",
                    method: "GET"

                }
            },
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;
