import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "./../utils/ApiHeaders";

export const leaveBalanceSettingsApi = createApi({
  reducerPath: "leaveBalanceSettingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ["Leave Balance"],
  endpoints: (builder) => ({
    getLeaveBalenceSettings: builder.query({
      query: (id) => ({
        url:  `admin/leave-setting-list/${id}`,
        method: "GET",

        headers,
      }),
      providesTags: ["Leave Balance"],
    }),

    leaveBalanceSettingSaveOrUpdate: builder.mutation({
      query: (company) => {
        return {
          url: `admin/leave-setting-save-or-update`,
          method: "POST",
          body: company,
          headers,
        };
      },
      invalidatesTags: ["Leave Balance"],
    }),





  }),
});

export const { useGetLeaveBalenceSettingsQuery, useLeaveBalanceSettingSaveOrUpdateMutation } =
leaveBalanceSettingsApi;
