import React, { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { navItem } from "./../../../Nav/NavItem";
import { user } from "../../../Route/utils";
import Sidebar from "./Sidebar";
import logo_sm from "../../../assets/logo/sm_logo.png";
import "./Dashboard.css";
import ScrollToTop from "react-scroll-to-top";
import { BiHomeAlt, BiSearchAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import profilePicture from "../../../assets/images/profile-picture.png";
import reset from "../../../assets/images/reset.png";
import { FaBars, FaDonate, FaExclamationTriangle } from "react-icons/fa";

import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsFillPersonFill,
  BsGearFill,

} from "react-icons/bs";
import { AiFillFileText } from "react-icons/ai";
import {
  RiLockPasswordFill,
  RiLogoutCircleRFill,

} from "react-icons/ri";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  

  const handelLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout Successfully");
    window.location.reload(false);
  };

  const refresh = () => {
    window.location.reload(false);
  };

  const [style, setStyle] = useState(
    "navbar-nav bg-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (style === "navbar-nav bg-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-primary sidebar sidebar-dark accordion toggled");
    } else {
      setStyle("navbar-nav bg-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (style === "navbar-nav bg-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-primary sidebar sidebar-dark accordion toggled1");
    } else {
      setStyle("navbar-nav bg-primary sidebar sidebar-dark accordion");
    }
  };

  return (
    <div>
      <ToastContainer />
      {/*  <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/*  <!-- Sidebar --> */}

        <ul className={style} id="accordionSidebar">
          {/*  <!-- Sidebar - Brand --> */}
          <Link
            className="sidebar-brand  d-flex align-items-center justify-content-center "
            to="#"
          >
            <Link to="/" className="sidebar-brand-icon rotate-n-15">
              <img src={logo_sm} width="30" alt="" />
            </Link>
            <div className="sidebar-brand-text mx-3">LMS</div>
            <div className="text-center d-none d-md-inline">
              {/* <i onClick={changeStyle} className="fas fa-bars ml-3"></i> */}
              <FaBars onClick={changeStyle} className="ml-3 " />
            </div>
          </Link>

          {/*   <!-- Divider --> */}
          {/* <hr className="sidebar-divider my-0" /> */}

          {/*  <!-- Nav Item - Dashboard --> */}
          <li className="nav-item active ">
            <div className="nav-link shadow-lg   d-flex flex-wrap justify-content-center">
              <div>
                {authUser && authUser.image ? (
                  <img
                    className="img-profile rounded-circle "
                    src={`${process.env.REACT_APP_FILE_URL}${authUser.image}`}
                    alt=""
                  />
                ) : (
                  <img
                    className="img-profile rounded-circle "
                    src={profilePicture}
                    alt=""
                  />
                )}
              </div>

              <div className="mt-1 ">
                <span className="d-none d-lg-inline text-light-600 small ml-2 font-weight-bold ">
                  {authUser && authUser.name.slice(0, 15)}
                  {/* <br />
                  <span className="d-none d-lg-inline text-light-600 small ml-2  ">
                    {authUser && authUser.user_type} 
                  </span> */}
                </span>
              </div>
            </div>
          </li>
          <li className="nav-item active mt-3">
            <NavLink className="nav-link nav-hover" to="/dashboard">
              <BiHomeAlt size={18} />
              <span className="ms-1">Dashboard</span>
            </NavLink>
            {/* <div className="text-center d-none d-md-inline">
                          <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                      </div> */}
          </li>

          {/*  <!-- Divider --> */}
          {/* <hr className="sidebar-divider" /> */}

          {navItem.map(
            (n, i) => n.role === user.role && <Sidebar item={n} key={i} />
          )}
          {/* <!-- Divider --> */}
          {/* <hr className="sidebar-divider d-none d-md-block" /> */}

          {/* <!-- Sidebar Toggler (Sidebar) --> */}
          {/* <div className="text-center d-none d-md-inline">
                          <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                      </div> */}
        </ul>
        {/*  <!-- End of Sidebar --> */}

        {/*  <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/*  <!-- Main Content --> */}
          <div id="content">
            {/*  <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            
              <button
                id="sidebarToggleTop"
                className="btn btn-link  d-md-none  rounded-circle mr-3  ml-2"
                onClick={changeStyle1}
              >
                {/* <i className="fa fa-bars"></i> */}

                <FaBars value={{ style: { verticalAlign: "middle" } }} />
              </button>

    
            
              <span className="cursor reset ms-auto" onClick={refresh}>
                <img src={reset} alt="" width={22} />
                {/* <RiRefreshFill size={22}  /> */}
              </span>
              <span className=" d-none d-md-block fw-bold">Refresh</span>

              {/*  <!-- Topbar Navbar --> */}

              <ul className="navbar-nav ml-auto">
                {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
          

  

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="mr-2 d-none d-lg-inline text-gray-600 small">
                      {authUser && authUser.name}
                      <div className="text-end text-info fw-bold">
                        {authUser && authUser.user_type}
                      </div>
                    </div>

                    {authUser && authUser.image ? (
                      <img
                        className="img-profile rounded-circle "
                        src={`${process.env.REACT_APP_FILE_URL}${authUser.image}`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="img-profile rounded-circle "
                        src={profilePicture}
                        alt=""
                      />
                    )}

                    {/* <img
                      className="img-profile rounded-circle"
                      src="img/undraw_profile.svg"
                      alt=""
                    /> */}
                  </Link>
                  {/*  <!-- Dropdown - User Information --> */}
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <Link className="dropdown-item" to="#">
                      {/* <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> */}
                      <BsFillPersonFill size={15} className="mr-1" />
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="#">
                      {/* <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> */}
                      <BsGearFill className="mr-1" />
                      Settings
                    </Link>

                    {authUser && authUser.user_type === "ApprovalAuthority" && (
                      <Link
                        className="dropdown-item"
                        to="approval-authority/change-password"
                      >
                        <RiLockPasswordFill size={15} className="mr-1" />
                        Change Password
                      </Link>
                    )}
                    {authUser && authUser.user_type === "Employee" && (
                      <Link
                        className="dropdown-item"
                        to="employee/change-password"
                      >
                        <RiLockPasswordFill size={15} className="mr-1" />
                        Change Password
                      </Link>
                    )}

                    <div className="dropdown-divider"></div>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={() => handelLogout()}
                    >
                      {/* <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> */}
                      <RiLogoutCircleRFill size={15} className="mr-1 mb-1" />
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
              
            </nav>
            {/*  <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              <Outlet />
            </div>
            {/*   <!-- /.container-fluid --> */}
          </div>
          {/*   <!-- End of Main Content -->

                                      <!-- Footer --> */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; BacBon Limited 2023</span>
              </div>
            </div>
          </footer>
          {/* <!-- End of Footer --> */}
        </div>
        {/*  <!-- End of Content Wrapper --> */}
      </div>
      {/*  <!-- End of Page Wrapper -->

     <!-- Scroll to Top Button--> */}

      <ScrollToTop smooth />
    </div>
  );
};

export default Layout;
