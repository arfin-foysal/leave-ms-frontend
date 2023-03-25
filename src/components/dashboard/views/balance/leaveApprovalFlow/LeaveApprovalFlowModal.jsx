import React from "react";
import Modal from "react-bootstrap/Modal";
// import BranchDetails from "../../branch/BranchDetails";
import CreateLeaveApprovalFlow from "./CreateLeaveApprovalFlow";
import EditLeaveApprovalFlow from "./EditLeaveApprovalFlow";

const LeaveApprovalFlowModal = ({ handleClose, show, clickValue, paramId }) => {
  
 


  return (
    <>
      <Modal show={show} onHide={handleClose}  size="md">
        <Modal.Header closeButton className=" bg-primary text-white">
          <Modal.Title>{clickValue}</Modal.Title>
        
        </Modal.Header>
        <Modal.Body >
          {/* {clickValue === "Branch Information" && <BranchDetails item={paramId} handleClose={handleClose}/>} */}
          {clickValue === "Add New Approval Flow" && <CreateLeaveApprovalFlow handleClose={handleClose}/>}
          {clickValue === "Edit Step" && <EditLeaveApprovalFlow item={paramId} handleClose={handleClose} />}
        </Modal.Body>
     
      </Modal>
    </>
  );
};

export default React.memo(LeaveApprovalFlowModal);
