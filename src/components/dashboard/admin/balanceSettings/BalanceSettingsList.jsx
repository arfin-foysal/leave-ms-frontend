import React, { useState } from "react";


import PageTopHeader from "../../../common/PageTopHeader";
import LeaveBalanceModal from "./BalanceSettingsModal";
import LeaveBalanceTable from "./BalanceSettingsTable";
import { GoGraph } from "react-icons/go";


const BalanceSettingsList = () => {




  const [clickValue, setClickValue] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);





  return (
    <>
      <PageTopHeader title="Leave Balance" />
      <div className="card shadow mb-4">
        <div className="card-header py-3 ">
          <div>
            <h6 className="m-0 font-weight-bold text-primary"> <GoGraph/> Leave Balance Settings
            </h6>
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

