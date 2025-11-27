import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // login
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // updateProfile
    updateProfile: builder.mutation({
      query: credentials => ({
        url: '/auth/update-auth-data',
        method: 'PATCH',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useUpdateProfileMutation } = authApi;
