import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';
import {
  logout,
  selectRefreshToken,
  setUser,
} from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_MY_BACKEND}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // matching all errors
  if (result?.error && result?.error?.status !== 401) {
    toast.error(result?.error?.data?.message);
  }

  // accessToken expired
  if (result?.error?.status === 401) {
    //* Send Refresh token automatically
    const state = api.getState();
    const refreshToken = selectRefreshToken(state);

    const res = await fetch(
      `${import.meta.env.VITE_MY_BACKEND}/api/v1/auth/access-token`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const response = await res.json();

    if (response?.data?.accessToken) {
      const user = state.auth.user;

      api.dispatch(
        setUser({
          user,
          accessToken: response.data.accessToken,
          refreshToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
