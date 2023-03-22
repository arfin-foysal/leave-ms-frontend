import React from "react";

import EmployeeTable from "./EmployeeTable";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { IoSyncCircle } from "react-icons/io5";
import PageTopHeader from "../../../common/PageTopHeader";
import { useGetEmployeeListQuery } from "../../../../services/employeeApi";
import { FaUserInjured } from "react-icons/fa";

const EmployeeList = () => {
  const get = useGetEmployeeListQuery();

  const refatchClick = () => {
    get.refetch();
  };
  return (
    <>
      <PageTopHeader title="Employee" />
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between">
          <div className="mt-1">
            <h6 className="m-0 font-weight-bold text-primary">
            <FaUserInjured/>  All Employee List{" "}
            </h6>
          </div>
          <div className="d-flex justify-content-end">
              <div className="mt-1">
                <IoSyncCircle
                  className="cursor "
                  color="black"
                  size={25}
                  onClick={() => refatchClick()}
                />
              </div>
              <div>
                <Link
                  to={`/dashboard/approval-authority/create-employee`}
                  className="btn btn-primary btn-sm"
                >
                  <BsFillPlusCircleFill /> Add New Employee
                </Link>
              </div>
            </div>
        </div>

        <div className="card-body">
        
      
            <EmployeeTable />
      
        </div>
        <div></div>
      </div>
    </>
  );
};

export default EmployeeList;
