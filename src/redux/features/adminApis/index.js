import { baseApi } from '../../api/baseApi';

const adminApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // fetchDashboardPage
    fetchDashboardPage: builder.query({
      query: () => ({
        url: '/admin/dashboard',
        method: 'GET',
      }),
    }),

    // getYearlyAppointmentStats
    getYearlyAppointmentStats: builder.query({
      query: year => ({
        url: `/admin/dashboard/yearly-appoiontment?year=${year}`,
        method: 'GET',
      }),
    }),

    // getYearlyRevenueStats
    getYearlyRevenueStats: builder.query({
      query: year => ({
        url: `/admin/dashboard/yearly-revenue?year=${year}`,
        method: 'GET',
      }),
    }),

    // getAllServices
    getAllServices: builder.query({
      query: ({ page = 1, limit = 50 } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        // if (name) params.set('name', name);

        return {
          url: `/admin/services?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // getAllBookings
    getAllBookings: builder.query({
      query: ({ page = 1, limit = 50 } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        // if (name) params.set('name', name);

        return {
          url: `/admin/get-all-bookings?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // getAllPaymentHistories
    getAllPaymentHistories: builder.query({
      query: ({ page = 1, limit = 50 } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        // if (name) params.set('name', name);

        return {
          url: `/payment-history/admin?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // getAllSecretReviews
    getAllSecretReviews: builder.query({
      query: ({ page = 1, limit = 50, searchTerm } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        if (searchTerm) params.set('searchTerm', searchTerm);

        return {
          url: `/admin/secret-reviews?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // getAllFaqs
    getAllFaqs: builder.query({
      query: ({ page = 1, limit = 50, searchTerm } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        if (searchTerm) params.set('searchTerm', searchTerm);

        return {
          url: `/faq?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // createFaq
    createFaq: builder.mutation({
      query: ({ data }) => ({
        url: `/faq/create`,
        method: 'POST',
        body: data,
      }),
    }),

    // updateFaq
    updateFaq: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/faq/update/${_id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    // deleteFaq
    deleteFaq: builder.mutation({
      query: ({ _id }) => ({
        url: `/faq/delete/${_id}`,
        method: 'DELETE',
      }),
    }),

    // getSpecificPageData
    getSpecificPageData: builder.query({
      query: ({ type } = {}) => {
        return {
          url: `/content/retrieve/${type}`,
          method: 'GET',
        };
      },
    }),

    // createOrUpdateSpecificPageData
    createOrUpdateSpecificPageData: builder.mutation({
      query: ({ data } = {}) => {
        return {
          url: `/content/create-or-update`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useFetchDashboardPageQuery,
  useGetYearlyAppointmentStatsQuery,
  useGetYearlyRevenueStatsQuery,
  useGetAllServicesQuery,
  useGetAllBookingsQuery,
  useGetAllPaymentHistoriesQuery,
  useGetAllSecretReviewsQuery,
  useGetAllFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useGetSpecificPageDataQuery,
  useCreateOrUpdateSpecificPageDataMutation,
} = adminApi;
