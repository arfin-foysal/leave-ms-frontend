import React, { useState, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";


import { BsFillEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";


import Loader from "../../../common/Loader";
import CompanyModal from "./CompanyModal";
import { useGetCompanyListQuery } from "../../../../services/companyApi";

const CompanyTable = () => {
  const { data, isSuccess, isFetching } = useGetCompanyListQuery();

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
          row.company_logo && (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "50px", height: "50px" }}
                src={`${process.env.REACT_APP_FILE_URL}${row.company_logo}`}
                alt=""
              />
            </>
          ), //alternate way
        id: "company_logo", //id required if you use accessorFn instead of accessorKey
        header: "Company Logo",
        Header: <span className="table-header">Company Logo</span>, //optional custom markup
      },

      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
      },

      {
        accessorKey: "contact_no", //normal accessorKey
        header: "Contact No",
      },
      {
        accessorKey: "company_email", //normal accessorKey
        header: "Company Email",
      },
  
    ],
    []
  );





  return (
    <>
      {isFetching && <Loader />}

      <CompanyModal
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
                    handelClickValue("Company Information");
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
                    handelClickValue("Edit Company Information");
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

export default React.memo(CompanyTable);
