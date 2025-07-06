/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/baseUrl";
import { message } from "antd";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    const token = localStorage.getItem("token");
    // console.log("Token:", token);

    if (token) {
      // headers.set("Authoriation", `Bearer ${token}`);
      headers.set("Authorization", `Bearer ${token}`);

    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 400) {
    message.error(result.error.data.message);
  }
  if (result?.error?.status === 404) {
    message.error(result.error.data.message);
  }
  if (result?.error?.status === 403) {
    message.error(result.error.data.message);
  }
  if (result?.error?.status === 401) {
    message.error(result.error.data.message);
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
