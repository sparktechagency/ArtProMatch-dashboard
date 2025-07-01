import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => ({
        url: "/api/v1/admin/fetch-client",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllClientsQuery } = usersApi;
