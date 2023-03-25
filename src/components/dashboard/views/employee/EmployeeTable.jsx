import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";

import { BsFillEyeFill } from "react-icons/bs";

import { FaEdit, FaPowerOff } from "react-icons/fa";

import { AiFillUnlock } from "react-icons/ai";
import Loader from "../../../common/Loader";
import avatar from "../../../../assets/images/profile-picture.png";

import { useGetEmployeeListQuery } from "../../../../services/employeeApi";
import PasswordUpdateModal from "./PasswordUpdateModal";
import OffboardModal from "./OffboardModal";

const EmployeeTable = () => {
  const { data, isSuccess, isFetching } = useGetEmployeeListQuery();
  const [showOffboard, setShowOffboard] = useState(false);
  const [show, setShow] = useState(false);

  const [paramId, setParamId] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseOffboard = () => setShowOffboard(false);
  const handleShowOffboard = () => setShowOffboard(true);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) =>
          row.image ? (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "50px", height: "50px" }}
                src={`${process.env.REACT_APP_FILE_URL}${row.image}`}
                alt=""
              ></img>
            </>
          ) : (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "50px", height: "50px" }}
                src={avatar}
                alt=""
              ></img>
            </>
          ), //alternate way
        id: "image", //id required if you use accessorFn instead of accessorKey
        header: "image",
        size: "small",

        Header: <span className="table-header">Image</span>, //optional custom markup
      },

      {
        accessorKey: "employee_code", //access nested data with dot notation
        header: "Code",
        size: "small",
      },
  
      {
        accessorKey: "name", //access nested data with dot notation
        header: "name",
        size: "small",
      },

      {
        accessorKey: "mobile", //access nested data with dot notation
        header: "Phone",
        size: "small",
      },
      {
        accessorKey: "email", //access nested data with dot notation
        header: "Email",
        size: "small",
      },

      {
        accessorFn: (row) =>
          row.name && (
            <>
              <span>
                {row?.designation}
                <br />
                <b>Dept. : </b>
                {row?.department}
              </span>
            </>
          ), //alternate way
        id: "designation", //id required if you use accessorFn instead of accessorKey
        header: "Designation",
        size: "small",
        Header: <span className="table-header">Designation</span>, //optional custom markup
      },

      // {
      //   accessorKey: "designation", //access nested data with dot notation
      //   header: "Designation",
      //   size: "small",
      // },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}

      <PasswordUpdateModal
        handleClose={handleClose}
        show={show}
        clickValue="Do you want to reset password?"
        paramId={paramId}
      />

      <OffboardModal
        handleClose={handleCloseOffboard}
        show={showOffboard}
        clickValue="Do you want to offboard this employee?"
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
        // enablePagination="true"
        renderRowActions={(row, index) => (
          <>
            <div className="d-flex">
              <div>
                <Link
                  to="#"
                  className="btn btn-warning btn-sm d-flex align-items-center"
                  onClick={() => {
                    handleShow();
                    setParamId(row?.row?.original?.user_id);
                  }}
                >
                  <div>
                    <AiFillUnlock className="mb-1 mr-1" size={18} />
                  </div>
                  <div> Reset</div>
                </Link>
              </div>
              <div className="mx-2">
                <Link
                  to={`/dashboard/approval-authority/employee-details/${row?.row?.original?.id}`}
                  className="btn btn-info btn-sm d-flex align-items-center"
                >
                  <div>
                    <BsFillEyeFill
                      className="mb-1 mr-1"
                      color="black"
                      size={18}
                    />
                  </div>

                  <div>Details</div>
                </Link>
              </div>

              <div className="me-1">
                <Link
                  to={`/dashboard/approval-authority/edit-employee/${row?.row?.original?.id}`}
                  title=""
                  className="px-2 btn btn-primary btn-sm d-flex align-items-center"
                >
                  <div>
                    <FaEdit className="mb-1 mr-1" size={16} />
                  </div>
                  <div>Edit</div>
                </Link>
              </div>

              <div className="ms-1">
                <Link
                  onClick={() => {
                    handleShowOffboard();
                    setParamId(row?.row?.original);
                  }}
                  className="px-2 btn btn-danger btn-sm d-flex align-items-center"
                >
                  <div>
                    <FaPowerOff className="mb-1 mr-1" size={14} />
                  </div>
                  <div>OffBoarding</div>
                </Link>
              </div>
            </div>
          </>
        )}
      />
    </>
  );
};

export default EmployeeTable;
