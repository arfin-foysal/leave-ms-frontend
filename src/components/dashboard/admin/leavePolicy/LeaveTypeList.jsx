import React, { useState, useCallback } from "react";

import {
 
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoSyncCircle } from "react-icons/io5";
import LeaveTypeModal from "./LeaveTypeModal";
import LeaveTypeTable from "./LeaveTypeTable";
import { useGetLeavePolicyListQuery } from "../../../../services/leavepolicyApi";
import PageTopHeader from "../../../common/PageTopHeader";
import { MdOutlinePolicy } from "react-icons/md";

const LeaveTypeList = () => {
  const get = useGetLeavePolicyListQuery();
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
      <PageTopHeader title="Leave Policy" />

      <div className="card shadow mb-4">
        <div className="card-header  d-flex justify-content-between">
          <div className="mt-1">
            <h6 className="m-0 font-weight-bold text-primary"><MdOutlinePolicy/> Leave Policy Setup
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
                  to="#"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    handleShow();
                    handelClickValue("Add New Leave Policy");
                  }}
                >
                  <BsFillPlusCircleFill className="mb-1 mr-1" /> Add New Leave policy
                </Link>
              </div>
            </div>
     
        </div>

        <div className="card-body">
      
  
            <LeaveTypeTable />
      
        </div>
      </div>
      <LeaveTypeModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(LeaveTypeList);
