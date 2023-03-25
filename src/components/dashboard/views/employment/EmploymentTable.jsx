import React, { useState, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";

import { BsFillEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import Loader from "../../../common/Loader";
import EmploymentModal from "./EmploymentModal";
import { useGetEmploymentTypeListQuery } from "../../../../services/employmentApi";

const EmploymentTable = () => {
  const { data, isSuccess, isFetching } =useGetEmploymentTypeListQuery ();
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
        accessorKey: "type", //normal accessorKey
        header: "Employment Type",
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

      <EmploymentModal
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
        muiTopToolbarProps={
          {
            style: {
              backgroundColor: "#0D6EFD",
           
            },

          }}
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
                    handelClickValue("Employment Type Information");
                    setParamId(row?.row?.original);
                    }}
                  >
                    <div className="mr-1">
                      <BsFillEyeFill color="black" size={18} />
                    </div>
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
                      handelClickValue("Edit Employment Type");
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
            </div>
            

 
          </>
        )}
      />
    </>
  );
};

export default React.memo(EmploymentTable);
