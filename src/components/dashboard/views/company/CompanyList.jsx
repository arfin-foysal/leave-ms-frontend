import React, { useState } from "react";

import "./Company.css";

import { IoSyncCircle } from "react-icons/io5";
import CompanyTable from "./CompanyTable";
import CompanyModal from "./CompanyModal";
import { useGetCompanyListQuery } from "../../../../services/companyApi";
import PageTopHeader from "../../../common/PageTopHeader";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const CompanyList = () => {
  const get = useGetCompanyListQuery();
  const [clickValue, setClickValue] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const refatchClick = () => {
    get.refetch();
  };
  return (
    <>
      <PageTopHeader title="Company" />
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between">
          <div className="mt-1">
            <h6 className="m-0 font-weight-bold text-primary">
              <HiOutlineOfficeBuilding /> Company Information
            </h6>
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
          </div>
        </div>

        <div className="card-body">
          <CompanyTable />
        </div>
      </div>
      <CompanyModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
      />
    </>
  );
};

export default React.memo(CompanyList);
