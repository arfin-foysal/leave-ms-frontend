import React from "react";
import { Modal, Button } from "react-bootstrap";

const CompanyDetails = ({ item, handleClose }) => {
  return (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-md-7 col-12">
            <div className="row">
              <div className="col-4">
                <img
                  className="img-fluid rounded-circle "
                  style={{ width: "150px", height: "150px" }}
                  src={`${process.env.REACT_APP_FILE_URL}${item.company_logo}`}
                  alt=""
                />
              </div>
              <div className="col-8">
                <p>
                  Name:
                  <span className="font-weight-bold text-primary ">
                    {" "}
                    {item.name}
                  </span>
                </p>
                <p>
                  Address:
                  <span className="font-weight-bold text-primary ">
                    {" "}
                    {item.address}
                  </span>
                </p>
                <p>
                  Contact No:
                  <span className="font-weight-bold text-primary ">
                    {" "}
                    {item.contact_no}
                  </span>
                </p>
                <p>
                  Employee Code Length:
                  <span className="font-weight-bold text-primary">
                    {" "}
                    {item.employee_code_length}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="row">
              <div className="col-12">
                <p>
                  Company Email:
                  <span className="font-weight-bold text-primary">
                    {" "}
                    {item.company_email}
                  </span>
                </p>
                <p>
                  HR Email:
                  <span className="font-weight-bold text-primary">
                    {" "}
                    {item.hr_email}
                  </span>
                </p>

                <p>
                  Leave Email:
                  <span className="font-weight-bold text-primary">
                    {" "}
                    {item.leave_email}
                  </span>
                </p>
                <p>
                  Company Prefix:
                  <span className="font-weight-bold text-primary">
                    {" "}
                    {item.company_prefix}
                  </span>
                </p>
                <p>
                  Status:
                  <span className="font-weight-bold text-primary">
                    {" "}
                    {item.is_active === true ? "Active" : "Dactive"}
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

export default CompanyDetails;
