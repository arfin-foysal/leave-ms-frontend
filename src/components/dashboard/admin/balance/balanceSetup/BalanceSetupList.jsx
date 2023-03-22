import React, { useState, useCallback } from "react";
import PageTopHeader from "../../../../common/PageTopHeader";
import BalanceSetupTable from "./BalanceSetupTable";
import BalanceSetupModal from "./BalanceSetupModal";
import { BiWallet } from "react-icons/bi";



const BalanceSetupList = () => {

  const [clickValue, setClickValue] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);


  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);


  return (
    <>
      <PageTopHeader title="Leave Balance" />
      <div className="card shadow mb-4">
        <div className="card-header ">
          <div className="">
            <h6 className="m-0 font-weight-bold text-primary">
          <BiWallet/>  Leave Balance List
            </h6>
          </div>

        </div>

        <div className="card-body pt-1 ">
      
            <BalanceSetupTable />
      
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

