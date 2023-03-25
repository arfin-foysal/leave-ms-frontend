import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "./../utils/ApiHeaders";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getCompanyList: builder.query({
      query: () => ({
        url: "admin/company-list",
        method: "GET",

        headers,
      }),
      providesTags: ["Company"],
    }),
    companySaveOrUpdate: builder.mutation({
      query: (company) => {
        return {
          url: `admin/company-save-or-update`,
          method: "POST",
          body: company,
          headers,
        };
      },
      invalidatesTags: ["Company"],
    }),


    text: builder.query({
      query: (id) => ({
        url:  `admin/leave-setting-list/${id}`,
        method: "GET",

        headers,
      }),
      providesTags: ["Leave Balance"],
    }),
  }),
});

export const { useGetCompanyListQuery, useCompanySaveOrUpdateMutation,useTextQuery } =
  companyApi;
