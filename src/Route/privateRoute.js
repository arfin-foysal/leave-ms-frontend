// import external Css modules  start

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; //date-range theme css file

// import external Css modules end

import { Navigate } from "react-router-dom";
import { getPath } from "./utils";
import AdminPage from "../components/dashboard/views/adminDashboardPage/AdminPage";
import Others from "../components/dashboard/otherViews/Others";
import EmployeeList from "./../components/dashboard/views/employee/EmployeeList";
import EmployeeDetails from "../components/dashboard/views/employee/EmployeeDetails";
import CreateEmployee from "./../components/dashboard/views/employee/CreateEmployee";
import CompanyList from "./../components/dashboard/views/company/CompanyList";
import BranchList from "../components/dashboard/views/branch/BranchList";
import DesignationList from "../components/dashboard/views/designation/DesignationList";
import DepartmentList from "../components/dashboard/views/department/DepartmentList";
import Employee from "../components/dashboard/otherViews/Employee";
import FiscalYearList from "../components/dashboard/views/fiscalYear/FiscalYearList";
import EmploymentList from "../components/dashboard/views/employment/EmploymentList";
import EditEmployee from "../components/dashboard/views/employee/EditEmployee";
import BalanceSetupList from "../components/dashboard/views/balance/balanceSetup/BalanceSetupList";
import LeaveApprovalFlowList from "../components/dashboard/views/balance/leaveApprovalFlow/LeaveApprovalFlowList";
import DayTypeSetupList from "./../components/dashboard/views/calender/dayTypeSetup/DayTypeSetupList";
import WorkingDayList from "../components/dashboard/views/calender/workingDaySetup/WorkingDayList";
import CalenderSetupList from "../components/dashboard/views/calender/calenderSetup/CalenderSetupList";
import BalanceSettingsList from "../components/dashboard/views/balanceSettings/BalanceSettingsList";
import ApplyForLeaveList from "../components/dashboard/views/leave/applyForLeave/ApplyForLeaveList";
import LeaveDetails from "./../components/dashboard/views/leave/applyForLeave/LeaveDetails";
import PendingLeaveList from "../components/dashboard/views/leave/pendingForLeaveApprovel/PendingLeaveList";
import ApproveLeaveList from "../components/dashboard/views/leave/approveLeaveList/ApproveLeaveList";
import MyCalender from "../components/dashboard/views/calender/academicCalendar/MyCalender";
import ChangePassword from './../components/pages/changePassword/ChangePassword';
import LeaveTypeList from "../components/dashboard/views/leavePolicy/LeaveTypeList";
import LeaveBalance from '../components/dashboard/views/leave/myLeaveBalance/LeaveBalance';
import WingList from "../components/dashboard/views/wing/WingList";
import { OffboardedEmployee } from './../components/dashboard/views/offboardedEmployee/OffboardedEmployee';



// We can use this route for private route
export const privateRoute = [
  //  <====================== Approval Authority Route Start ====================>
  {
    path: "/dashboard/",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },

  //  <====================== Admin Route Start ====================>
  {
    path: "admin",
    element: <AdminPage />,
    role: "admin",
  },
  //  <====================== Admin Route End ====================>

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
    path: "approval-authority/offboarded-employee-list",
    element: <OffboardedEmployee />,
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
    path: "approval-authority/wing-list",
    element: <WingList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/leave-balance",
    element: <BalanceSettingsList />,
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
    path: "approval-authority/approval-flow",
    element: <LeaveApprovalFlowList />,
    role: "approvalauthority",
  },

  {
    path: "approval-authority/apply-for-leave",
    element: <ApplyForLeaveList />,
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

  {
    path: "approval-authority/my-leave-balance",
    element: <LeaveBalance />,
    role: "approvalauthority",
  },

  {
    path: "approval-authority/my-calendar",
    element: <MyCalender />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/leave-type",
    element: <LeaveTypeList />,
    role: "approvalauthority",
  },
  {
    path: "approval-authority/calendar-setup",
    element: <CalenderSetupList />,
    role: "approvalauthority",
  }, {
    path: "approval-authority/change-password",
    element: <ChangePassword/>,
    role: "approvalauthority",
  },


  // {
  //     path: 'about',
  //     element: <About />,
  //     role: 'approval-authority',

  // },

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
  {
    path: "employee/change-password",
    element: <ChangePassword/>,
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
