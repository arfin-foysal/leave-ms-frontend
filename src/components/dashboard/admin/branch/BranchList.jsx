import React, { useState, useCallback } from "react";

import {
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoSyncCircle } from "react-icons/io5";
import BranchModal from "./BranchModal";
import BranchTable from "./BranchTable";
import { useGetBranchListQuery } from "../../../../services/branchApi";
import PageTopHeader from "../../../common/PageTopHeader";
import { TbGitBranch } from "react-icons/tb";
// import { useSelector } from "react-redux";


const BranchList = () => {

  const get = useGetBranchListQuery();
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
  <PageTopHeader title="Branch"/>
      <div className="card shadow mb-4">
        <div className="card-header  d-flex justify-content-between">
          <div className="mt-1">
            <h6 className="m-0 font-weight-bold text-primary"> <TbGitBranch size={19} /> Branch Information</h6>


          </div>
          <div className=" text-right mr-1">
            <div className="d-flex justify-content-end">
              <div className="">
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
                    handelClickValue("Add New Branch");
                  }}
                >
                  <BsFillPlusCircleFill className="mb-1 mr-1" />  Add New Branch
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className="card-body">
        
          
            <BranchTable />
         
        </div>
      </div>
      <BranchModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(BranchList);
