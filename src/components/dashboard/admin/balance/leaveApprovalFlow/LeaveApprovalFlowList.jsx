import React from "react";

import LeaveApprovalFlowTable from "./LeaveApprovalFlowTable";
import PageTopHeader from "../../../../common/PageTopHeader";
import { MdAppRegistration } from 'react-icons/md';

const LeaveApprovalFlowList = () => {

  return (
    <>
      <PageTopHeader title="Approval Work Flow Setup" />
      <div className="card shadow mb-4">
        <div className="card-header py-3 ">
          <div>
            <h6 className="m-0 font-weight-bold text-primary">
         <MdAppRegistration/>   Leave Work Flow Setup
            </h6>
          </div>
        </div>

        <div className="card-body  pt-0 ">
          <LeaveApprovalFlowTable />
        </div>
      </div>
    </>
  );
};

export default LeaveApprovalFlowList;
