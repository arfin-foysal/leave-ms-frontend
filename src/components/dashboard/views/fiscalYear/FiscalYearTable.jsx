import React, { useState, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import Loader from "../../../common/Loader";
import FiscalYearModal from "./FiscalYearModal";
import { useGetFiscalYearListQuery } from "../../../../services/fiscalyearApi";
import Moment from "react-moment";

const FiscalYearTable = () => {
  const { data, isSuccess, isFetching } = useGetFiscalYearListQuery();
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
        accessorKey: "fiscal_year", //access nested data with dot notation
        header: "Fiscal Year",
      },

      {
        // <Moment format="DD MMM YYYY" >{row.start_date}</Moment>
        accessorFn: (row) =>
          row.start_date && (
            <>
              <Moment format="dddd, DD MMM, YYYY">{row.start_date}</Moment>
            </>
          ), //alternate way
        id: "start_date", //id required if you use accessorFn instead of accessorKey
        header: "Start Date",
        Header: <span className="table-header">Start Date</span>, //optional custom markup
      },
      {
        // <Moment format="DD MMM YYYY" >{row.start_date}</Moment>
        accessorFn: (row) =>
          row.start_date && (
            <>
              <Moment format="dddd, DD MMM, YYYY">{row.end_date}</Moment>
            </>
          ), //alternate way
        id: "end_date", //id required if you use accessorFn instead of accessorKey
        header: "Start Date",
        Header: <span className="table-header">End Date</span>, //optional custom markup
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

      <FiscalYearModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      {/* <MaterialReactTable columns={columns} data={data} /> */}
      <MaterialReactTable
        // enableRowSelection
        columns={columns}
        data={isSuccess && data?.data}
        enableRowActions
        enableColumnActions
        // enableRowNumbers
        positionActionsColumn="last"
        muiTopToolbarProps={{
          style: {
            backgroundColor: "#0D6EFD",
          },
        }}
        // muiTableHeadRowProps={

        //   {
        //     style: {
        //       backgroundColor: "#0D6EFD",
        //     },
        //   }
        // }

      

        // enablePagination="true"
        renderRowActions={(row, index) => (
          <>
            <div className="d-flex ">
              <div className="mr-1">
                <Link
                  to="#"
                    className="btn btn-info btn-sm d-flex align-items-center"
                  onClick={() => {
                    handleShow();
                    handelClickValue("Fiscal Year Information");
                    setParamId(row?.row?.original);
                  
                  }}
                >
                  <div className="mr-1"><BsFillEyeFill color="black" size={18} /></div>
                  <div>Details</div>
                  
                  
                </Link>
              </div>
              <div>
                <Link
                  to={`#`}
                  title=""
                  className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                  onClick={() => {
                    handleShow();
                    handelClickValue("Edit Fiscal Year");
                    setParamId(row?.row?.original);
                  }}
                >
                  <div>   <FaEdit size={16} /></div>
                  <div> Edit</div>
               
                </Link>
              </div>

     
            </div>
          </>
        )}
      />
    </>
  );
};

export default React.memo(FiscalYearTable);
