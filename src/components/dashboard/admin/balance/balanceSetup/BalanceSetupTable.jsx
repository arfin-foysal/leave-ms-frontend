import React, { useState, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";

import { FaEdit } from "react-icons/fa";

import { IoSyncCircle } from "react-icons/io5";
import Select from "react-select";
import BalanceSetupModal from "./BalanceSetupModal";
import { useGetEmployeeListQuery } from "../../../../../services/employeeApi";
import { useGetBalanceSetupListQuery } from "../../../../../services/balanceSetupApi";
import Loader from "../../../../common/Loader";


const BalanceSetupTable = () => {
  const [employeeId, setEmployeeId] = useState(1);
  const [isTrue, setIsTrue] = useState(true);
  const { data, isSuccess, isFetching } = useGetBalanceSetupListQuery(
    employeeId,
    { skip: isTrue }
  );
  const { data: employeeList } = useGetEmployeeListQuery();
  const get = useGetBalanceSetupListQuery(employeeId);

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
  };

  // };

  const columns = useMemo(
    () => [
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
        accessorKey: "availed_days", //access nested data with dot notation
        header: "Availed Days",
      },
      {
        accessorKey: "remaining_days",

        header: "Remaining",
      },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}

      <BalanceSetupModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      {/* <MaterialReactTable columns={columns} data={data} /> */}

      <MaterialReactTable
        columns={columns}
        data={isSuccess && data?.data?.balance_list}
        enableRowActions
        enableColumnActions
        positionActionsColumn="last"
        muiTopToolbarProps={{
          style: {
            backgroundColor: "#0D6EFD",
          },
        }}
        renderTopToolbarCustomActions={() => (
          <>
            <div className="col-md-3 d-flex justify-content-start ">
              <Select
                className="w-100"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                placeholder="Select Employee"
                classNamePrefix="balance-setup"
                onChange={(e) => setEmployeeId(e.id, setIsTrue(false))}
                getOptionValue={(option) => `${option["id"]}`}
                getOptionLabel={(option) =>
                  `${option["name"]} (${option["employee_code"]})`
                }
                options={employeeList?.data}
              />
              <IoSyncCircle
                className="cursor mt-2 ms-1"
                color="white"
                size={25}
                onClick={() => refatchClick()}
              />
            </div>
            <div className=""></div>
          </>
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

export default React.memo(BalanceSetupTable);
