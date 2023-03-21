
// <----------------- Navbar icon start ------------------>
import { FiSettings } from "react-icons/fi";
import { BiWalletAlt, BiWallet } from "react-icons/bi";
import {
  BsCalendar3,
  BsBox,
  BsCalendar2Check,
  BsCalendar2Day,
  BsCalendarCheck,
  BsVinylFill,
  BsCalendarDay,
  BsHourglassSplit,
} from "react-icons/bs";
import { ImUserMinus } from "react-icons/im";

import { MdAppRegistration, MdOutlinePolicy } from "react-icons/md";

import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { TbGitBranch } from "react-icons/tb";
import { FaSith, FaCodepen, FaUserInjured } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { MdWorkOutline } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { RiFileList3Line } from "react-icons/ri";
import { SlWallet } from "react-icons/sl";
import { TfiWrite } from "react-icons/tfi";
import { GiAngelWings } from "react-icons/gi";

// <----------------- Navbar icon end ------------------>

export const navItem = [
  //UID Mustbe Uges String
  // <--------------admin Nav Start----------------->

  // <-----------------admin Nav End------------->

  // {
  //   title: "About",
  //   link: "about",
  //   role: "admin",
  //   icon: "fas fa-dice-d6",
  // },

  //<----------------- Approval Authority Nav Start----------------->

  {
    UID: "settings",
    title: "Master Settings",
    role: "approvalauthority",
    icon: <FiSettings />,
    children: [
      {
        title: "Company Info",
        link: "approval-authority/company-list",
        role: "approvalauthority",
        icon: <HiOutlineOfficeBuilding size={18} />,
      },

      {
        title: "Fiscal Year",
        link: "approval-authority/fiscal-year-list",
        role: "approvalauthority",
        icon: <BsCalendar2Check size={16} />,
      },

      {
        title: "Branch",
        link: "approval-authority/branch-list",
        role: "approvalauthority",
        icon: <TbGitBranch size={19} />,
      },
      {
        title: "Department",
        link: "approval-authority/department-list",
        role: "approvalauthority",
        icon: <FaCodepen size={18} />,
      },
      {
        title: "Designation",
        link: "approval-authority/designation-list",
        role: "approvalauthority",
        icon: <FaSith size={18} />,
      },

      {
        title: "Employment Type",
        link: "approval-authority/employment-list",
        role: "approvalauthority",
        icon: <BsBox size={16} />,
      },
      {
        title: "Wing",
        link: "approval-authority/wing-list",
        role: "approvalauthority",
        icon: <GiAngelWings size={16} />,
      },
      {
        title: "Employee",
        link: "approval-authority/employee-list",
        role: "approvalauthority",
        icon: <FaUserInjured size={17} />,
      },
      {
        title: "Offboarded",
        link: "approval-authority/offboarded-employee-list",
        role: "approvalauthority",
        icon: <ImUserMinus size={18} />,
      },
      {
        title: "Leave Policy",
        link: "approval-authority/leave-type",
        role: "approvalauthority",
        icon: <MdOutlinePolicy size={18} />,
      },

      {
        title: "Balance Settings",
        link: "approval-authority/leave-balance",
        role: "approvalauthority",
        icon: <GoGraph size={17} />,
      },
    ],
  },
  {
    UID: "calendar",
    title: "Calendar Settings",
    role: "approvalauthority",
    icon: <BsCalendar3 size={15} />,

    children: [
      {
        title: "Day Type Setup",
        link: "approval-authority/day-type-setup",
        role: "approvalauthority",
        icon: <BsCalendar2Day size={15} />,
      },
      {
        title: "Working Day Setup",
        link: "approval-authority/working-day-setup",
        role: "approvalauthority",
        icon: <MdWorkOutline size={18} />,
      },
      {
        title: "Calendar Setup",
        link: "approval-authority/calendar-setup",
        role: "approvalauthority",
        icon: <BsCalendarCheck size={15} />,
      },
      {
        title: "Academic Calender",
        link: "approval-authority/my-calendar",
        role: "approvalauthority",
        icon: <BsCalendarDay size={15} />,
      },
    ],
  },

  {
    UID: "blance",
    title: "Balance Setup",
    role: "approvalauthority",
    icon: <BiWalletAlt size={18} />,

    children: [
      {
        title: "My Leave Balance",
        link: "approval-authority/my-leave-balance",
        role: "approvalauthority",
        icon: <SlWallet size={16} />,
      },

      {
        title: "Balance Setup",
        link: "approval-authority/balance-setup",
        role: "approvalauthority",
        icon: <BiWallet size={18} />,
      },
      {
        title: "Approval Flow",
        link: "approval-authority/approval-flow",
        role: "approvalauthority",
        icon: <MdAppRegistration size={20} />,
      },
    ],
  },

  {
    UID: "leave",
    title: "Leave Application",
    role: "approvalauthority",
    icon: <FcLeave size={18} />,
    children: [
      {
        title: "My leave Application",
        link: "approval-authority/my-leave-application",
        role: "approvalauthority",
        icon: <TfiWrite size={15} />,
      },
      {
        title: "Pending For Approval",
        link: "approval-authority/pending-leave-list",
        role: "approvalauthority",
        icon: <BsHourglassSplit size={18} />,
      },
      {
        title: "Approved List",
        link: "approval-authority/approved-leave-list",
        role: "approvalauthority",
        icon: <RiFileList3Line size={18} />,
      },
    ],
  },

  //<----------------- Approval Authority Nav End --------------->

  //<----------------- Employee Nav Start---------------------->
  {
    UID: "calendar",
    title: "Calendar Settings",
    role: "employee",
    icon: <BsCalendar3 size={15} />,

    children: [
      {
        title: "Academic Calender",
        link: "employee/my-calendar",
        role: "employee",
        icon: <BsCalendarDay size={15} />,
      },
    ],
  },

  {
    UID: "blance",
    title: "Balance Setup",
    role: "employee",
    icon: <BiWalletAlt size={18} />,

    children: [
      {
        title: "My Leave Balance",
        link: "employee/my-leave-balance",
        role: "employee",
        icon: <SlWallet size={18} />,
      },
    ],
  },

  {
    UID: "leave",
    title: "Leave Application",
    role: "employee",
    icon: <FcLeave size={18} />,
    children: [
      {
        title: "My leave Application",
        link: "employee/my-leave-application",
        role: "employee",
        icon: <TfiWrite size={15} />,
      },
    ],
  },
  // Employee Nav End

  // Others Nav Start
  {
    title: "Others",
    link: "others",
    role: "others",
    icon: <BsVinylFill size={16} />,
  },

  //<----------------- Employee Nav End---------------->
];
