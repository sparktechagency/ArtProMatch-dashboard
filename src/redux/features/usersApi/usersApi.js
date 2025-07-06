import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => ({
        url: "/api/v1/admin/fetch-client",
        method: "GET",
      }),
      invalidatesTags: ["verified-busines"],
    }),

    getAllBusiness: builder.query({
      query: () => ({
        url: "/api/v1/admin/fetch-business",
        method: "GET",
      }),
      invalidatesTags: ["verified-busines"],
    }),
    getAllArtist: builder.query({
      query: () => ({
        url: "/api/v1/admin/fetch-artists",
        method: "GET",
      }),
      invalidatesTags: ["verified-artist"],
    }),

    approveBusiness: builder.mutation({
      query: ({ _id }) => ({
        url: `/api/v1/admin/verified-business/${_id}`,
        method: "PATCH",
      }),
      providesTags: ["verified-busines"],
    }),
    approveArtist: builder.mutation({
      query: ({ _id }) => ({
        url: `/api/v1/admin/verified-artist/${_id}`,
        method: "PATCH",
      }),
      providesTags: ["verified-artist"],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetAllBusinessQuery,
  useApproveBusinessMutation,
  useGetAllArtistQuery,
  useApproveArtistMutation
} = usersApi;
