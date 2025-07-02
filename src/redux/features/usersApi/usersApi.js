import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => ({
        url: "/api/v1/admin/fetch-client",
        method: "GET",
      }),
    }),

    getAllBusiness: builder.query({
      query: () => ({
        url: "/api/v1/admin/fetch-business",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllClientsQuery, useGetAllBusinessQuery } = usersApi;
