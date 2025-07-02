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

    approveBusiness: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/api/v1/admin/verified-business/${_id}`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetAllBusinessQuery,
  useApproveBusinessMutation,
} = usersApi;
