import React from "react";
import Modal from "react-bootstrap/Modal";
import WingDetails from "./WingDetails";
import CreateWing from './CreateWing';
import EditWing from './EditWing';


const WingModal = ({ handleClose, show, clickValue,paramId }) => {
  


  return (
    <>
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton className=" bg-primary text-white">
        <Modal.Title>{clickValue}</Modal.Title>
      
      </Modal.Header>
      <Modal.Body>
        {clickValue === "Wing Information" && <WingDetails item={paramId} handleClose={handleClose}/>}
        {clickValue === "Add New Wing" && <CreateWing handleClose={handleClose}/>}
        {clickValue === "Edit Wing" && <EditWing item={paramId} handleClose={handleClose} />}
      </Modal.Body>
   
    </Modal>
  </>
  );
};

export default React.memo(WingModal);
