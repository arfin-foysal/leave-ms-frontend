import React from "react";
import { Button, Modal } from "react-bootstrap";
import  Moment from "react-moment";

const FiscalYearDetails = ({ item, handleClose }) => {
  return (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 col-12">
            <p>
              Fiscal Year:
              <span className="font-weight-bold text-primary ">
                {" "}
                {item.fiscal_year}
              </span>
            </p>
            <p>
              Start Date:
              <span className="font-weight-bold text-primary ">
                <Moment format="dddd, DD MMM, YYYY">{item.start_date}</Moment>
              </span>
            </p>

            <p>
              End Date:
              <span className="font-weight-bold text-primary ">
               
                <Moment format="dddd, DD MMM, YYYY">{item.end_date}</Moment>
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

export default FiscalYearDetails;
