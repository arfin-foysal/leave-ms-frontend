import React, { useState, useCallback } from "react";

import {
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoSyncCircle } from "react-icons/io5";


// import { useSelector } from "react-redux";
import PageTopHeader from './../../../../common/PageTopHeader';
import ApplyForLeaveTable from "./ApplyForLeaveTable";
import ApplyForLeaveModal from "./ApplyForLeaveModal";
import { useGetLeaveApplicationListQuery } from "../../../../../services/leaveApplication";
import { TfiWrite } from "react-icons/tfi";


const ApplyForLeaveList = () => {
  const res= useGetLeaveApplicationListQuery();



  const [clickValue, setClickValue] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);
  const refatchClick = () => {
    res.refetch();
  };



  return (
    <>
  <PageTopHeader title="Apply Leave"/>
      <div className="card shadow mb-4">
        <div className="card-header  d-flex justify-content-between">
          <div className="mt-1">
            <h6 className="m-0 font-weight-bold text-primary"> <TfiWrite/> Applied Leave List</h6>


          </div>
         
          <div className="d-flex justify-content-end">
        
       <div >
                <IoSyncCircle
                  className="cursor "
                  color="black"
                  size={25}
                  onClick={() => refatchClick()}
                />
          </div>
        <div>
          <Link
            to="#"
            className="btn btn-primary btn-sm"
            onClick={() => {
              handleShow();
              handelClickValue("Apply For a Leave");
            }}
          >
            <BsFillPlusCircleFill className="mb-1 mr-1" /> Apply For A Leave
          </Link>
        </div>
      </div>

        </div>

        <div className="card-body">
  
    
            <ApplyForLeaveTable />
        
        </div>
      </div>
      <ApplyForLeaveModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(ApplyForLeaveList);
