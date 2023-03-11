// import external Css modules  start

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

// import external Css modules end

import { Navigate } from "react-router-dom";
import { getPath } from "./utils";
import AdminPage from "../components/dashboard/admin/adminDashboardPage/AdminPage";
import Others from "../components/dashboard/views/Others";
import ApprovalAuthority from "../components/dashboard/views/ApprovalAuthority";
import EmployeeList from "./../components/dashboard/admin/employee/EmployeeList";
import EmployeeDetails from "../components/dashboard/admin/employee/EmployeeDetails";
import CreateEmployee from "./../components/dashboard/admin/employee/CreateEmployee";
import CompanyList from "./../components/dashboard/admin/company/CompanyList";
import BranchList from "../components/dashboard/admin/branch/BranchList";
import DesignationList from "../components/dashboard/admin/designation/DesignationList";
import DepartmentList from "../components/dashboard/admin/department/DepartmentList";
import LeaveTypeList from "./../components/dashboard/admin/leaveType/LeaveTypeList";
import Employee from "./../components/dashboard/views/Employee";
import FiscalYearList from "../components/dashboard/admin/fiscalYear/FiscalYearList";
import EmploymentList from "../components/dashboard/admin/employment/EmploymentList";
import EditEmployee from "../components/dashboard/admin/employee/EditEmployee";
import BalanceSetupList from "../components/dashboard/admin/balanceSetup/BalanceSetupList";
import LeaveApprovalFlowList from "../components/dashboard/admin/leaveApprovalFlow/LeaveApprovalFlowList";
import DayTypeSetupList from "./../components/dashboard/admin/calender/dayTypeSetup/DayTypeSetupList";
import WorkingDayList from "../components/dashboard/admin/calender/workingDaySetup/WorkingDayList";
import CalenderSetupList from "../components/dashboard/admin/calender/calenderSetup/CalenderSetupList";
import BalanceSettingsList from "../components/dashboard/admin/balanceSettings/BalanceSettingsList";
import ApplyForLeaveList from "../components/dashboard/admin/leave/applyForLeave/ApplyForLeaveList";
import LeaveDetails from './../components/dashboard/admin/leave/applyForLeave/LeaveDetails';
import PendingLeaveList from "../components/dashboard/admin/leave/pendingForLeaveApprovel/PendingLeaveList";
import ApproveLeaveList from "../components/dashboard/admin/leave/approveLeaveList/ApproveLeaveList";
import MyCalender from "../components/dashboard/admin/calender/academicCalendar/MyCalender";
import LeaveBalance from "../components/dashboard/admin/leave/leaveBalance/LeaveBalance";




// We can use this route for private route

export const privateRoute = [
  //<====================== Admin Route start ====================>
  {
    path: "/dashboard/",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },
  {
    path: "admin",
    element: <AdminPage />,
    role: "admin",
  },
  {
    path: "admin/employee-list",
    element: <EmployeeList />,
    role: "admin",
  },
  {
    path: "admin/create-employee",
    element: <CreateEmployee />,
    role: "admin",
  },
  {
    path: "admin/edit-employee/:id",
    element: <EditEmployee />,
    role: "admin",
  },
  {
    path: "admin/employee-details/:id",
    element: <EmployeeDetails />,
    role: "admin",
  },
  {
    path: "admin/company-list",
    element: <CompanyList />,
    role: "admin",
  },
  {
    path: "admin/branch-list",
    element: <BranchList />,
    role: "admin",
  },
  {
    path: "admin/designation-list",
    element: <DesignationList />,
    role: "admin",
  },
  {
    path: "admin/department-list",
    element: <DepartmentList />,
    role: "admin",
  },
  {
    path: "admin/leave-type",
    element: <LeaveTypeList />,
    role: "admin",
  },
  {
    path: "admin/fiscal-year-list",
    element: <FiscalYearList />,
    role: "admin",
  },
  {
    path: "admin/employment-list",
    element: <EmploymentList />,
    role: "admin",
  },
  {
    path: "admin/leave-balance",
    element: <BalanceSettingsList />,
    role: "admin",
  },
  {
    path: "admin/balance-setup",
    element: <BalanceSetupList />,
    role: "admin",
  },
  {
    path: "admin/day-type-setup",
    element: <DayTypeSetupList />,
    role: "admin",
  },
  {
    path: "admin/working-day-setup",
    element: <WorkingDayList />,
    role: "admin",
  },
  {
    path: "admin/calendar-setup",
    element: <CalenderSetupList />,
    role: "admin",
  },

  {
    path: "admin/approval-flow",
    element: <LeaveApprovalFlowList />,
    role: "admin",
  },

  {
    path: "admin/apply-for-leave",
    element: <ApplyForLeaveList />,
    role: "admin",
  },

  // {
  //     path: 'about',
  //     element: <About />,
  //     role: 'admin',

  // },

  //<====================== Admin Route End ====================>

  //  <====================== Approval Authority Route Start ====================>

  {
    path: "approval-authority",
    element: <AdminPage />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/employee-list",
    element: <EmployeeList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/create-employee",
    element: <CreateEmployee />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/edit-employee/:id",
    element: <EditEmployee />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/employee-details/:id",
    element: <EmployeeDetails />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/company-list",
    element: <CompanyList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/branch-list",
    element: <BranchList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/designation-list",
    element: <DesignationList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/department-list",
    element: <DepartmentList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/leave-type",
    element: <LeaveTypeList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/fiscal-year-list",
    element: <FiscalYearList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/employment-list",
    element: <EmploymentList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/leave-balance",
    element: <BalanceSettingsList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/my-leave-balance",
    element: <LeaveBalance />,
    role: "approvalauthority",
  },

  {
    path: "approval-authority/balance-setup",
    element: <BalanceSetupList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/day-type-setup",
    element: <DayTypeSetupList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/working-day-setup",
    element: <WorkingDayList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/calendar-setup",
    element: <CalenderSetupList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/my-calendar",
    element: <MyCalender />,
    role: "approvalauthority",
  },

  {
    path: "approval-authority/approval-flow",
    element: <LeaveApprovalFlowList />,
    role: "approvalauthority",
  },

  {
    path: "approval-authority/my-leave-application",
    element: <ApplyForLeaveList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/leave-details/:id",
    element: <LeaveDetails />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/pending-leave-list",
    element: <PendingLeaveList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/approved-leave-list",
    element: <ApproveLeaveList />,
    role: "approvalauthority",
  },


  //  <====================== Approval Authority Route End ====================>

  // <====================== Employee Route Start ====================>

  {
    path: "employee",
    element: <AdminPage />,
    role: "employee",
  },
  {
    path: "employee",
    element: <Employee />,
    role: "employee",
  },
  
  {
    path: "employee/my-calendar",
    element: <MyCalender />,
    role: "employee",
  },
  {
    path: "employee/my-leave-balance",
    element: <LeaveBalance />,
    role: "employee",
  },

  {
    path: "employee/my-leave-application",
    element: <ApplyForLeaveList />,
    role: "employee",
  },
  {
    path: "employee/leave-details/:id",
    element: <LeaveDetails />,
    role: "employee",
  },

  // <====================== Employee Route End ====================>

  // <====================== Others Route Start ====================>

  {
    path: "others",
    element: <Others />,
    role: "others",
  },

  // <====================== Others Route End ====================>
];
