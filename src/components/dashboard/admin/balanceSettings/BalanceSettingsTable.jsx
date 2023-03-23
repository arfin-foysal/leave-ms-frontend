import React, { useState, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import { IoSyncCircle } from "react-icons/io5";
import Select from "react-select";
import Loader from "../../../common/Loader";
import { useGetLeaveBalenceSettingsQuery } from "../../../../services/leaveBalanceSettingsApi";
import { useGetEmploymentTypeListQuery } from "../../../../services/employmentApi";

import BalanceSettingsModal from "./BalanceSettingsModal";

const BalanceSettingsTable = () => {
  const [employmentTypeId, setEmploymentTypeId] = useState(0);
  const { data: employmentType } = useGetEmploymentTypeListQuery();

  const { data, isSuccess, isFetching } =
    useGetLeaveBalenceSettingsQuery(employmentTypeId);

  const get = useGetLeaveBalenceSettingsQuery(employmentTypeId);

  const [show, setShow] = useState(false);
  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const refatchClick = () => {
    get.refetch();
    setEmploymentTypeId(0);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "employment_type", //normal accessorKey
        header: "Employment Type",
      },
      {
        accessorFn: (row) => ` ${row.leave_title} ( ${row.leave_short_code})`,

        //alternate way
        id: "leave_title", //id required if you use accessorFn instead of accessorKey
        header: "leave_title",
        Header: <span className="table-header">Leave Type</span>, //optional custom markup
      },

      {
        accessorKey: "total_days", //access nested data with dot notation
        header: "Total Days",
      },
      {
        accessorKey: "company_name", //access nested data with dot notation
        header: "Company Name",
      },

      {
        accessorFn: (row) =>
          row.is_active === true ? (
            <>
              <span className="badge badge-success">Active</span>
            </>
          ) : (
            <>
              <span className="badge badge-danger">Inactive</span>
            </>
          ), //alternate way
        id: "is_active", //id required if you use accessorFn instead of accessorKey
        header: "Status",
        Header: <span className="table-header">Status</span>, //optional custom markup
      },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}

      <BalanceSettingsModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      {/* <MaterialReactTable columns={columns} data={data} /> */}

      <div className="mb-1 text-right ">
        <div className=" d-flex justify-content-end  ">
          <div className="mt-1 col-md-8 "></div>

          <div className="col-md-3 p-0"></div>
        
        </div>
      </div>

      <MaterialReactTable
        columns={columns}
        data={isSuccess && data?.data}
        enableRowActions
        enableColumnActions
        positionActionsColumn="last"
        rowsPerPageOptions={[5]}
        muiTopToolbarProps={{
          style: {
            backgroundColor: "#0D6EFD",
          },
        }}
        renderTopToolbarCustomActions={() => (
          <div className="col-md-3 d-flex justify-content-start ">
            <Select
              className="w-100"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              placeholder="Select Employment"
              classNamePrefix="Employment Type"
              onChange={(e) => setEmploymentTypeId(e.id)}
              getOptionValue={(option) => `${option["id"]}`}
              getOptionLabel={(option) => `${option["type"]}`}
              options={employmentType?.data}
            />
            <IoSyncCircle
              className="cursor mt-2 ms-1"
              color="white"
              size={25}
              onClick={() => refatchClick()}
            />
          </div>
        )}
        // enablePagination="true"
        renderRowActions={(row, index) => (
          <>
            <div className="d-flex">
              <Link
                to={`#`}
                title=""
                className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                onClick={() => {
                  handleShow();
                  handelClickValue("Edit Leave Balance");
                  setParamId(row?.row?.original);
                }}
              >
                <div>
                  {" "}
                  <FaEdit size={16} />
                </div>
                <div> Edit</div>
              </Link>
            </div>
          </>
        )}
      />
    </>
  );
};

export default React.memo(BalanceSettingsTable);
