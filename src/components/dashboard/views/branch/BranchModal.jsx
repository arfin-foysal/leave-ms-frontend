import React from "react";

import Modal from "react-bootstrap/Modal";
import BranchDetails from './BranchDetails';
import CreateBranch from "./CreateBranch";
import EditBranch from './EditBranch';
const BranchModal = ({ handleClose, show, clickValue,paramId }) => {


  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton className=" bg-primary text-white">
          <Modal.Title>{clickValue}</Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Branch Information" && <BranchDetails item={paramId} handleClose={handleClose}/>}
          {clickValue === "Add New Branch" && <CreateBranch handleClose={handleClose}/>}
          {clickValue === "Edit Branch" && <EditBranch item={paramId} handleClose={handleClose} />}
        </Modal.Body>
     
      </Modal>
    </>
  );
};

export default React.memo(BranchModal);
