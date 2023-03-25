import React, { useState, useCallback } from "react";
import CalenderSetupModal from "./CalenderSetupModal";
import CalenderSetupTable from "./CalenderSetupTable";
import PageTopHeader from "./../../../../common/PageTopHeader";
import { BsCalendarCheck, BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CalenderSetupList = () => {
  const [clickValue, setClickValue] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  return (
    <>
      <PageTopHeader title="Leave Balance" />
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between">
          <div className="mt-1">
            <h6 className="m-0 font-weight-bold text-primary">
              <BsCalendarCheck /> Official Calendar
            </h6>
          </div>

          <div className="pb-0">
            <Link
              to="#"
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Year");
              }}
            >
              <BsFillPlusCircleFill className="mb-1 mr-1" />
              Generate Calendar
            </Link>
          </div>
        </div>

        <div className="card-body pt-0 ">
          <CalenderSetupTable />
        </div>
      </div>
      <CalenderSetupModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(CalenderSetupList);
