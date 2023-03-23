import React, { useState, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import LeaveBalanceModal from "./CalenderSetupModal";

import { IoSyncCircle } from "react-icons/io5";
import Select from "react-select";
import Loader from "./../../../../common/Loader";

import {
  useGetCalenderListByYearQuery,
  useGetYearListQuery,
} from "../../../../../services/calenderApi";
import { month } from "../../../../../utils/month";

const CalenderSetupTable = () => {
  const [yearId, setYearId] = useState(null);
  const [monthId, setMonthId] = useState(null);
  const { data: yearList } = useGetYearListQuery();

  const { data, isSuccess, isFetching } = useGetCalenderListByYearQuery({
    year: yearId,
    month: monthId,
  });
  const get = useGetCalenderListByYearQuery({ year: yearId, month: monthId });
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "year", //access nested data with dot notation
        header: "Year",
      },
      {
        accessorKey: "date", //access nested data with dot notation
        header: "date",
      },
      {
        accessorKey: "day_title", //access nested data with dot notation
        header: "Day Name",
      },
      {
        accessorFn: (row) =>
          ` ${row.day_type_title} ( ${row.day_type_short_code})`,

        //alternate way
        id: "day_type_title", //id required if you use accessorFn instead of accessorKey
        header: "day_type_title",
        Header: <span className="table-header">Day Status</span>, //optional custom markup
      },
      {
        accessorKey: "day_note", //access nested data with dot notation
        header: "Note",
      },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}

      <LeaveBalanceModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />

      <div className=" text-right my-1 "></div>

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
        initialState={{ pagination: { pageSize: 31 } }}
        renderTopToolbarCustomActions={() => (
          <div className=" d-flex justify-content-start ">
            <span style={{ width: "200px" }}>
              <Select
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 99 }) }}
                placeholder="Select Year"
                classNamePrefix="Employment Type"
                onChange={(e) => setYearId(e.year)}
                getOptionValue={(option) => `${option["id"]}`}
                getOptionLabel={(option) => `${option["year"]}`}
                options={yearList?.data}
              />
            </span>

            <span style={{ width: "200px" }}>
              <Select
                className="mx-2"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 99 }) }}
                placeholder="Select Month"
                classNamePrefix="month"
                onChange={(e) => setMonthId(e.id)}
                getOptionValue={(option) => `${option["id"]}`}
                getOptionLabel={(option) => `${option["name"]}`}
                options={month}
              />
            </span>
            <IoSyncCircle
              className="cursor mt-2"
              color="white "
              size={25}
              onClick={() => refatchClick()}
            />
          </div>
        )}
        renderRowActions={(row, index) => (
          <>
            <div className="d-flex">
              <Link
                to={`#`}
                title=""
                className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                onClick={() => {
                  handleShow();
                  handelClickValue("Update Date Status");
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

export default React.memo(CalenderSetupTable);
