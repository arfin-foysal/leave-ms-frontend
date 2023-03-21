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
import { leaveApprovalFlowApi } from "../services/leaveApprovalFlowApi";
import { calenderApi } from "../services/calenderApi";
import { leaveBalanceSettingsApi } from "../services/leaveBalanceSettingsApi";
import { balanceSetupApi } from "../services/balanceSetupApi";
import { leaveApplicationApi } from './../services/leaveApplication';
import { wingApi } from "../services/wingApi";


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
    [leaveBalanceSettingsApi.reducerPath]: leaveBalanceSettingsApi.reducer,
    [leaveApprovalFlowApi.reducerPath]: leaveApprovalFlowApi.reducer,
    [calenderApi.reducerPath]: calenderApi.reducer,
    [balanceSetupApi.reducerPath]: balanceSetupApi.reducer,
    [leaveApplicationApi.reducerPath]: leaveApplicationApi.reducer,
    [wingApi.reducerPath]: wingApi.reducer,
    


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
      leaveBalanceSettingsApi.middleware,
      leaveApprovalFlowApi.middleware,
      calenderApi.middleware,
      balanceSetupApi.middleware,
      leaveApplicationApi.middleware,
      wingApi.middleware
   
    ]),
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
