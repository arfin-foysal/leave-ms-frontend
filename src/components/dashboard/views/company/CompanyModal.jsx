import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CompanyDetails from "./CompanyDetails";
import CreateCompany from "./CreateCompany";
import EditCompany from "./EditCompany";


const CompanyModal = ({ handleClose, show, clickValue,paramId }) => {


 
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className=" bg-primary text-white">
          <Modal.Title>{clickValue}</Modal.Title>
          
        </Modal.Header >
        <Modal.Body>
          {clickValue === "Company Information" && <CompanyDetails item={paramId} handleClose={ handleClose} />}
          {clickValue === "Add Company Information" && <CreateCompany handleClose={handleClose} />}
          {clickValue === "Edit Company Information" && <EditCompany item={paramId} handleClose={handleClose} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(CompanyModal);
