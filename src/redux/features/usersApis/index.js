import { baseApi } from '../../api/baseApi';

const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // getAllClients
    getAllClients: builder.query({
      query: ({ page = 1, limit = 50, searchTerm } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        if (searchTerm) params.set('searchTerm', searchTerm);

        return {
          url: `/admin/fetch-clients?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // getAllArtists
    getAllArtists: builder.query({
      query: ({ page = 1, limit = 50, searchTerm } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        if (searchTerm) params.set('searchTerm', searchTerm);

        return {
          url: `/admin/fetch-artists?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // getAllBusinesses
    getAllBusinesses: builder.query({
      query: ({ page = 1, limit = 50, searchTerm } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        if (searchTerm) params.set('searchTerm', searchTerm);

        return {
          url: `/admin/fetch-businesses?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // approveArtist
    approveArtist: builder.mutation({
      query: ({ _id }) => ({
        url: `/admin/verify-artist/${_id}`,
        method: 'PATCH',
        // body: data,
      }),
    }),
    
    // approveBusiness
    approveBusiness: builder.mutation({
      query: ({ _id }) => ({
        url: `/admin/verify-business/${_id}`,
        method: 'PATCH',
        // body: data,
      }),
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetAllArtistsQuery,
  useGetAllBusinessesQuery,
  useApproveArtistMutation,
  useApproveBusinessMutation,
} = usersApi;
