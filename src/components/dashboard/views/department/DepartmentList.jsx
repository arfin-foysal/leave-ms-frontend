import React, { useState, useCallback } from "react";

import {
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoSyncCircle } from "react-icons/io5";
import DepartmentTable from "./DepartmentTable";
import DepartmentModal from "./DepartmentModal";
import { useGetdepartmentListQuery } from "../../../../services/departmentApi";
import PageTopHeader from "../../../common/PageTopHeader";
import { FaCodepen } from "react-icons/fa";

const DepartmentList = () => {

  const get = useGetdepartmentListQuery();
  const [clickValue, setClickValue] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const refatchClick = () => {
    get.refetch();
  };
  return (
    <>
      <PageTopHeader title="Department"/>
      <div className="card shadow mb-4">
        <div className="card-header  d-flex justify-content-between">
          <div className="mt-1"> 
            <h6 className="m-0 font-weight-bold text-primary"> <FaCodepen size={16} /> Department List</h6>
          </div>
          <div className="d-flex justify-content-end">
              <div>
                <IoSyncCircle
                  className="cursor "
                  color="black"
                  size={25}
                  onClick={() => refatchClick()}
                />
              </div>
              <div>
                <Link
                  to="#"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    handleShow();
                    handelClickValue("Add New Department");
                  }}
                >
                  <BsFillPlusCircleFill className="mb-1 mr-1" /> Add New Department
                </Link>
              </div>
            </div>

        </div>

        <div className="card-body">
       
            <DepartmentTable />
       
        </div>
      </div>
      <DepartmentModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(DepartmentList);
