import React from "react";

import Modal from "react-bootstrap/Modal";
import FiscalYearDetails from "./FiscalYearDetails";
import CreateFiscalYear from './CreateFiscalYear';
import EditFiscalYear from "./EditFiscalYear";
const FiscalYearModal = ({ handleClose, show, clickValue,paramId }) => {


 
  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton className=" bg-primary text-white">
          <Modal.Title>{clickValue}</Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Fiscal Year Information" && <FiscalYearDetails item={paramId} handleClose={handleClose}/>}
          {clickValue === "Add New Fiscal Year" && <CreateFiscalYear handleClose={handleClose}/>}
          {clickValue === "Edit Fiscal Year" && <EditFiscalYear item={paramId} handleClose={handleClose} />}
        </Modal.Body>
     
      </Modal>
    </>
  );
};

export default React.memo(FiscalYearModal);
