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

  console.log("data", data);

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

      <div className=" text-right my-1 ">
        <div className=" d-flex justify-content-end  ">
          <div className="mt-1 col-md-8 ">
            <IoSyncCircle
              className="cursor "
              color="black"
              size={25}
              onClick={() => refatchClick()}
            />
          </div>

          <div className="col-md-2">
            <Select
              placeholder="Select Year"
              // isClearable={true}
              classNamePrefix="Employment Type"
              // backspaceRemovesValue={true}
              onChange={(e) => setYearId(e.year)}
              getOptionValue={(option) => `${option["id"]}`}
              getOptionLabel={(option) => `${option["year"]}`}
              options={yearList?.data}
            />
          </div>
          <div className="col-md-2">
            <Select
              placeholder="Select Month"
              isClearable={true}
              classNamePrefix="month"
              // backspaceRemovesValue={true}
              onChange={(e) => setMonthId(e.id)}
              getOptionValue={(option) => `${option["id"]}`}
              getOptionLabel={(option) => `${option["name"]}`}
              options={month}
            />
          </div>
          <div className="col-md-2 p-0 mt-1">
            <Link
              to="#"
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Year");
              }}
            >
              <BsFillPlusCircleFill className="mb-1 mr-1" />
              Generate Calendar
            </Link>
          </div>
        </div>
      </div>

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
        initialState={{ pagination: { pageSize: 31} }}
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
