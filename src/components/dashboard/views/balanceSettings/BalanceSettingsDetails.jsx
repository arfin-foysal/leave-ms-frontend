import React from "react";
import { Button, Modal } from "react-bootstrap";

const BalanceSettingsDetails = ( {item,handleClose} ) => {




  return (
    <>
    
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="row">

              <div className="col-8">
                <p>
                  Name:
                  <span className="font-weight-bold text-primary ">{item.name}</span>
                </p>
                <p>
                Company Name:
                  <span className="font-weight-bold text-primary ">{ item.company_name} </span>
                </p>
            
          
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-12">
                <p>
                  Company Email:
                  <span className="font-weight-bold text-primary">{item.branch_name }</span>
                </p>
          
                <p>
              Is Active:
              <span className="font-weight-bold text-primary">
                {" "}
                {item.is_active === true ? "Active" : "Inactive"}
              </span>
            </p>
         
              </div>
            </div>
          </div>
        </div>
        <Modal.Footer>
           
           <div>
             <Button variant="dark" onClick={handleClose}>
               Close
             </Button>
           </div>
         
       </Modal.Footer>
      </div>
    </>
  );
};

export default BalanceSettingsDetails;
