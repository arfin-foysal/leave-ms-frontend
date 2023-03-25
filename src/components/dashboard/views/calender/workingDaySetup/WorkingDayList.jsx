import React, { useState, useCallback } from "react";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoSyncCircle } from "react-icons/io5";

import WorkingDayTable from "./WorkingDayTable";
import WorkingDayModal from "./WorkingDayModal";
import { useGetBranchListQuery } from "../../../../../services/branchApi";
import PageTopHeader from "../../../../common/PageTopHeader";
import { MdWorkOutline } from "react-icons/md";
// import { useSelector } from "react-redux";

const WorkingDayList = () => {
  //  const user= useSelector((state) => state.auth.role);

  // console.log(user);

  const get = useGetBranchListQuery();
  const [clickValue, setClickValue] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handelClickValue = useCallback((value) => {
  //   setClickValue(value);
  // }, []);

  // const refatchClick = () => {
  //   get.refetch();
  // };

  return (
    <>
      <PageTopHeader title="Working Day" />
      <div className="card shadow mb-4">
        <div className="card-header py-3 n">
          <div>
            <h6 className="m-0 font-weight-bold text-primary"> <MdWorkOutline/> Working Day</h6>
          </div>
        </div>

        <div className="card-body m-0 p-0">
        
          <div>
            <WorkingDayTable />
          </div>
        </div>
      </div>
      <WorkingDayModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(WorkingDayList);
