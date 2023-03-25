import React from "react";

import Modal from "react-bootstrap/Modal";
import BalanceSettingsDetails from './BalanceSettingsDetails';
import CreatBalanceSettings from './CreatBalanceSettings';
import EditBalanceSettings from './EditBalanceSettings';



const BalanceSettingsModal = ({ handleClose, show, clickValue,paramId }) => {


 
  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton className=" bg-primary text-white">
          <Modal.Title>{clickValue}</Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Leave Balance Information" && <BalanceSettingsDetails item={paramId} handleClose={handleClose}/>}
          {clickValue === "Add New Leave Balance" && <CreatBalanceSettings handleClose={handleClose}/>}
          {clickValue === "Edit Leave Balance" && <EditBalanceSettings item={paramId} handleClose={handleClose} />}
        </Modal.Body>
     
      </Modal>
    </>
  );
};

export default React.memo(BalanceSettingsModal);
