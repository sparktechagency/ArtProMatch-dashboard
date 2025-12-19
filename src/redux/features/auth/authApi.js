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
      // invalidatesTags: ['Auth'],
    }),

    // updateProfile
    updateProfile: builder.mutation({
      query: credentials => ({
        url: '/auth/update-auth-data',
        method: 'PATCH',
        body: credentials,
      }),
      // invalidatesTags: ['Auth'],
    }),

    // updateProfilePhoto
    updateProfilePhoto: builder.mutation({
      query: formData => ({
        url: '/auth/update-profile-photo',
        method: 'PUT',
        body: formData,
      }),
      // invalidatesTags: ['Auth'],
    }),

    // changePassword
    changePassword: builder.mutation({
      query: credentials => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdateProfileMutation,
  useUpdateProfilePhotoMutation,
  useChangePasswordMutation,
} = authApi;
