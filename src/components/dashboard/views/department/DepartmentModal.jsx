import React from "react";

import Modal from "react-bootstrap/Modal";



import DepartmentDetails from './DepartmentDetails';
import CreateDepartment from './CreateDepartment';
import EditDepartment from './EditDepartment';
const DepartmentModal = ({ handleClose, show, clickValue,paramId }) => {


 
  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton className=" bg-primary text-white">
          <Modal.Title>{clickValue}</Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Department Information" && <DepartmentDetails item={paramId} handleClose={handleClose}/>}
          {clickValue === "Add New Department" && <CreateDepartment handleClose={handleClose}/>}
          {clickValue === "Edit Department" && <EditDepartment item={paramId} handleClose={handleClose} />}
        </Modal.Body>
     
      </Modal>
    </>
  );
};

export default React.memo(DepartmentModal);
