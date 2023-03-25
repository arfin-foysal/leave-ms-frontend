import React from "react";
import { Button, Modal } from "react-bootstrap";

const WorkingDayDetails = ({ item,handleClose }) => {

  return (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <p>
              Name:
              <span class="font-weight-bold text-primary ">{item.name}</span>
            </p>
            <p>
              Address:
              <span class="font-weight-bold text-primary ">
                {" "}
                {item.address}{" "}
              </span>
            </p>
            <p>
              Contact No:
              <span class="font-weight-bold text-primary ">
                {" "}
                {item.contact_no}
              </span>
            </p>
          </div>
          <div className="col-6">
            <p>
              Company:
              <span class="font-weight-bold text-primary ">
                {" "}
                {item.company_name}{" "}
              </span>
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

export default WorkingDayDetails;
