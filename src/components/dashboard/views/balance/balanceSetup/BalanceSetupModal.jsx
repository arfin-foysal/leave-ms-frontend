import React from "react";

import Modal from "react-bootstrap/Modal";
import BalanceSetupDetails from './BalanceSetupDetails';
import CreateBalanceSetup from './CreateBalanceSetup';
import EditBalanceSetup from './EditBalanceSetup';
const BalanceSetupModal
 = ({ handleClose, show, clickValue,paramId }) => {


 
  return (
    <>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fs-6">{clickValue}</Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Balance Setup Information" && <BalanceSetupDetails item={paramId} handleClose={handleClose}/>}
          {clickValue === "Add New Leave Balance" && <CreateBalanceSetup handleClose={handleClose}/>}
          {clickValue === "Edit Leave Balance" && <EditBalanceSetup item={paramId} handleClose={handleClose} />}
        </Modal.Body>
     
      </Modal>
    </>
  );
};

export default React.memo(BalanceSetupModal
  );
