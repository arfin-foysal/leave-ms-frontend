import React, { useState, useCallback } from "react";

import LeaveApprovalFlowTable from "./LeaveApprovalFlowTable";
import PageTopHeader from "../../../../common/PageTopHeader";
import { MdAppRegistration } from "react-icons/md";
import LeaveApprovalFlowModal from "./LeaveApprovalFlowModal";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";

const LeaveApprovalFlowList = () => {
  const [show, setShow] = useState(false);

  const [clickValue, setClickValue] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  return (
    <>
      <PageTopHeader title="Approval Work Flow Setup" />
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between">
          <div className="mt-1">
            <h6 className="m-0 font-weight-bold text-primary">
              <MdAppRegistration /> Leave Work Flow Setup
            </h6>
          </div>

          <div className="pb-0">
            <Link
              to="#"
              className="btn btn-primary btn-sm mt-1"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Approval Flow");
              }}
            >
              <BsFillPlusCircleFill className="mb-1 mr-1" /> Add Flow
            </Link>
          </div>
        </div>

        <div className="card-body  pt-1">
          <LeaveApprovalFlowTable />
        </div>
      </div>

      <LeaveApprovalFlowModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default LeaveApprovalFlowList;
