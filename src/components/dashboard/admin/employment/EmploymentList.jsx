import React, { useState, useCallback } from "react";

import {

  BsBox,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { Link,  } from "react-router-dom";


import { IoSyncCircle } from "react-icons/io5";
import PageTopHeader from "../../../common/PageTopHeader";
import EmploymentTable from "./EmploymentTable";
import EmploymentModal from "./EmploymentModal";
import { useGetEmploymentTypeListQuery } from "../../../../services/employmentApi";


const EmploymentList = () => {

  const get= useGetEmploymentTypeListQuery();
  const [clickValue, setClickValue] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const refatchClick = () => {
    get.refetch();
  };
  return (
    <>
      <PageTopHeader title="Employment Type" />
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between ">
          <div className="mt1">
            <h6 className="m-0 font-weight-bold text-primary"> <BsBox/> Employment Type</h6>
          </div>
          <div className="d-flex justify-content-end">
              <div className="mt-1">
                <IoSyncCircle
                  className="cursor "
                  color="black"
                  size={25}
                  onClick={() => refatchClick()}
                />
              </div>
              <div >
                <Link
                  to="#"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    handleShow();
                    handelClickValue("Add New Employment Type");
                  }}
                >
                  <BsFillPlusCircleFill className="mb-1 mr-1" /> Add New Employment
                </Link>
              </div>
            </div>
     
        </div>

        <div className="card-body">
      
       
            <EmploymentTable/>
         
        </div>
      </div>
      <EmploymentModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(EmploymentList);
