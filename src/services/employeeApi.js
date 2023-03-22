import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { headers } from "./../utils/ApiHeaders";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getEmployeeList: builder.query({
      query: () => ({
        url: "admin/employee-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Employee"],
    }),
    getOffboardedEmployeeList: builder.query({
      query: () => ({
        url: "admin/offboarded-employee-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Employee"],
    }),
    addEmployee: builder.mutation({
      query: (employee) => {
        return {
          url: `admin/add-employee`,
          method: "POST",
          body: employee,
          headers,
        };
      },
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: (employee) => {
        return {
          url: `admin/update-employee`,
          method: "POST",
          body: employee,
          headers,
        };
      },
      invalidatesTags: ["Employee"],
    }),

    getDivisionList: builder.query({
      query: () => ({
        url: "division-list",
        method: "GET",

        headers,
      }),
      providesTags: ["Employee"],
    }),

    getDistrictListById: builder.query({
      query: (id) => ({
        url: `district-list/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Employee"],
    }),

    getUpazilaListById: builder.query({
      query: (id) => ({
        url: `upazila-list/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Employee"],
    }),
    getAreaListById: builder.query({
      query: (id) => ({
        url: `area-list/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Employee"],
    }),
    employeeDetailsById: builder.query({
      query: (id) => ({
        url: `/admin/employee-details-by-id/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Employee"],
    }),
    leaveBalanceListByEmpId: builder.query({
      query: (id) => ({
        url: `/admin/leave-balance-list/${id}`,
        method: "GET",
        headers,
      }),
      providesTags: ["Employee"],
    }),
    getApprovalAuthorityList: builder.query({
      query: () => ({
        url: "admin/approval-authority-list",
        method: "GET",
        headers,
      }),
      providesTags: ["Employee"],
    }),

    addOffBoardingEmployee: builder.mutation({
      query: (employee) => {
        return {
          url: `admin/make-employee-offboarded`,
          method: "POST",
          body: employee,
          headers,
        };
      },
      invalidatesTags: ["Employee"],
    }),
    // /

  }),
});

export const {
  useGetEmployeeListQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetDivisionListQuery,
  useGetDistrictListByIdQuery,
  useGetUpazilaListByIdQuery,
  useGetAreaListByIdQuery,
  useEmployeeDetailsByIdQuery,
  useLeaveBalanceListByEmpIdQuery,
  useGetApprovalAuthorityListQuery,
  useGetOffboardedEmployeeListQuery,
  useAddOffBoardingEmployeeMutation,

} = employeeApi;
