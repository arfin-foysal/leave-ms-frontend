import React, { useState, useCallback } from "react";

import PageTopHeader from "../../../common/PageTopHeader";
import BalanceSetupModal from "./BalanceSetupModal";
import BalanceSetupTable from "./BalanceSetupTable";

const BalanceSetupList = () => {

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
        <div className="card-header py-3 ">
          <div>
            <h6 className="m-0 font-weight-bold text-primary">
            Leave Balance List
            </h6>
          </div>
        </div>

        <div className="card-body">
          <div>
            <BalanceSetupTable />
          </div>
        </div>
      </div>
      <BalanceSetupModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(BalanceSetupList
);

