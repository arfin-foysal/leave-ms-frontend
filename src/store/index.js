import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/authSlice";
import { authApi } from "./../services/authApi";
import { branchApi } from "./../services/branchApi";
import { companyApi } from "./../services/companyApi";
import { departmentApi } from "../services/departmentApi";
import { designationApi } from "../services/designationApi";
import { leavepolicyApi } from "../services/leavepolicyApi";
import { fiscalyearApi } from "../services/fiscalyearApi";
import { employmentApi } from "../services/employmentApi";
import { leaveBalanceApi } from "../services/leaveBalanceApi";
import { employeeApi } from "../services/employeeApi";
import { balanceSetupApi } from './../services/balanceSetupApi';
import { leaveApprovalFlowApi } from "../services/leaveApprovalFlowApi";
import { calenderApi } from "../services/calenderApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [designationApi.reducerPath]: designationApi.reducer,
    [leavepolicyApi.reducerPath]: leavepolicyApi.reducer,
    [fiscalyearApi.reducerPath]: fiscalyearApi.reducer,
    [employmentApi.reducerPath]: employmentApi.reducer,
    [leaveBalanceApi.reducerPath]: leaveBalanceApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [balanceSetupApi.reducerPath]: balanceSetupApi.reducer,
    [leaveApprovalFlowApi.reducerPath]: leaveApprovalFlowApi.reducer,
    [calenderApi.reducerPath]: calenderApi.reducer,


    devTools: true,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      companyApi.middleware,
      branchApi.middleware,
      departmentApi.middleware,
      designationApi.middleware,
      leavepolicyApi.middleware,
      fiscalyearApi.middleware,
      employmentApi.middleware,
      leaveBalanceApi.middleware,
      employeeApi.middleware,
      balanceSetupApi.middleware,
      leaveApprovalFlowApi.middleware,
      calenderApi.middleware,
    ]),
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
