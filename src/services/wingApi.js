import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../utils/ApiHeaders";

export const wingApi = createApi({
  reducerPath: "wingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ["Wing"],
  endpoints: (builder) => ({
    getWingList: builder.query({
      query: () => ({
        url: `admin/wing-list`,
        method: "GET",
        headers,
      }),
      providesTags: ["Wing"],
    }),
    wingSaveOrUpdate: builder.mutation({
      query: (wing) => {
        return {
          url: `admin/wing-save-or-update`,
          method: "POST",
          body: wing,
          headers,
        };
      },
      invalidatesTags: ["Wing"],
    }),

    branchListByCompanyId: builder.query({
      query: (id) => ({
        url: `/admin/branch-list-by-company-id/${id}`,
        method: 'GET',
        headers
      }),
      providesTags: ['Wing']
    }),
    getDesignationtListByCompanyAndBranchId: builder.query({
      query: ({ comId,braId }) => ({
      
        url: `admin/designation-list-by-id/${comId}/${braId}`,
        method: 'GET',
        headers
      }),
      providesTags: ['Wing']
    }),



  }),
});

export const {useGetWingListQuery,useWingSaveOrUpdateMutation} =
wingApi;
