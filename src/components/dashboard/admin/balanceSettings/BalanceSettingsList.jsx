import React, { useState, useCallback } from "react";

import PageTopHeader from "../../../common/PageTopHeader";
import LeaveBalanceModal from "./BalanceSettingsModal";
import LeaveBalanceTable from "./BalanceSettingsTable";
import { GoGraph } from "react-icons/go";
import { BiWallet } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";

const BalanceSettingsList = () => {
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
              <BiWallet />
              Leave Balance Settings
            </h6>
          </div>

          <div className="pb-0">
            <Link
              to="#"
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Leave Balance");
              }}
            >
              <BsFillPlusCircleFill className="mb-1 mr-1" /> Add New Leave
              Settings
            </Link>
          </div>
        </div>

        <div className="card-body  pt-1">
          <LeaveBalanceTable />
        </div>
      </div>
      
      <LeaveBalanceModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(BalanceSettingsList);
