import React from "react";
import Modal from "react-bootstrap/Modal";
import LeaveTypeDetails from './LeaveTypeDetails';
import CreateLeaveType from './CreateLeaveType';
import EditLeaveType from './EditLeaveType';
const LeaveTypeModal = ({ handleClose, show, clickValue,paramId }) => {


 
  return (
    <>
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className=" bg-primary text-white ">
        <Modal.Title>{clickValue}</Modal.Title>
      
      </Modal.Header>
      <Modal.Body>
        {clickValue === "Leave Policy Information" && <LeaveTypeDetails item={paramId} handleClose={handleClose}/>}
        {clickValue === "Add New Leave Policy" && <CreateLeaveType handleClose={handleClose}/>}
        {clickValue === "Edit Leave Policy" && <EditLeaveType item={paramId} handleClose={handleClose} />}
      </Modal.Body>
   
    </Modal>
  </>
  );
};

export default React.memo(LeaveTypeModal);
