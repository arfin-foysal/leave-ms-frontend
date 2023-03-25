import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import WorkingDayDetails from "./WorkingDayDetails";
import CreateWorkingDay from "./CreateWorkingDay";
import EditWorkingDay from "./EditWorkingDay";
const WorkingDayModal = ({ handleClose, show, clickValue,paramId }) => {


  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{clickValue}</Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Branch Information" && <WorkingDayDetails item={paramId} handleClose={handleClose}/>}
          {clickValue === "Add Branch Information" && <CreateWorkingDay handleClose={handleClose}/>}
          {clickValue === "Update Day Status" && <EditWorkingDay item={paramId} handleClose={handleClose} />}
        </Modal.Body>
     
      </Modal>
    </>
  );
};

export default React.memo(WorkingDayModal);
