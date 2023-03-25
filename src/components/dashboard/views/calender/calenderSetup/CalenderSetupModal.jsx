import React from "react";

import Modal from "react-bootstrap/Modal";
import CalenderSettingeDetails from "./CalenderSetupDetails";
import CreateCalenderSettinge from "./CreateCalenderSetup";
import EditCalenderSettinge from "./EditCalenderSetup";

const CalenderSetupModal = ({ handleClose, show, clickValue, paramId }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton className=" bg-primary text-white">
          <Modal.Title>{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Leave Balance Information" && (
            <CalenderSettingeDetails item={paramId} handleClose={handleClose} />
          )}
          {clickValue === "Add New Year" && (
            <CreateCalenderSettinge handleClose={handleClose} />
          )}
          {clickValue === "Update Date Status" && (
            <EditCalenderSettinge item={paramId} handleClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(CalenderSetupModal);
