import React, { useState, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

// import Select from './../calender/workingDaySetup/Select';
import Select from "react-select";
import { useGetApprovalFlowListQuery } from "../../../../../services/leaveApprovalFlowApi";
import { useGetEmployeeListQuery } from "../../../../../services/employeeApi";
import Loader from "./../../../../common/Loader";
import LeaveApprovalFlowModal from "./LeaveApprovalFlowModal";

const LeaveApprovalFlowTable = () => {
  const [employeeId, setEmployeeId] = useState(0);

  const { data, isSuccess, isFetching } =
    useGetApprovalFlowListQuery(employeeId);
  const { data: employeeList } = useGetEmployeeListQuery();

  const [show, setShow] = useState(false);

  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) =>
          ` ${row.authority_name} - 
            ${row.authority_email}`,

        //alternate way
        id: "authority_name", //id required if you use accessorFn instead of accessorKey
        header: "authority_name",
        Header: <span className="table-header">Approval Authority</span>, //optional custom markup
      },
      {
        accessorFn: (row) =>
          ` ${row.employee_name} - 
           ${row.employee_email}`,

        //alternate way
        id: "employee_name", //id required if you use accessorFn instead of accessorKey
        header: "employee_name",
        Header: <span className="table-header">Employee</span>, //optional custom markup
      },

      {
        accessorKey: "step", //normal accessorKey
        header: "Step",
        size: 50,
      },
    ],
    []
  );

  return (
    <>
      <div className="d-flex justify-content-end py-1">
        <div></div>
      </div>

      {isFetching && <Loader />}

      <LeaveApprovalFlowModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      {/* <MaterialReactTable columns={columns} data={data} /> */}
      <MaterialReactTable
        columns={columns}
        data={isSuccess && data?.data}
        enableRowActions
        enableColumnActions
        positionActionsColumn="last"
        muiTopToolbarProps={{
          style: {
            backgroundColor: "#0D6EFD",
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Select
            className="w-25"
            menuPortalTarget={document.body}
            styles={{
              
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,

              })
            }}
            placeholder="Select Employee"
            onChange={(e) => setEmployeeId(e.id)}
            getOptionValue={(option) => `${option["id"]}`}
            getOptionLabel={(option) =>
              `${option["name"]} (${option["employee_code"]})`
            }
            options={employeeList?.data}
          />
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
                  handelClickValue("Edit Step");
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

export default React.memo(LeaveApprovalFlowTable);
