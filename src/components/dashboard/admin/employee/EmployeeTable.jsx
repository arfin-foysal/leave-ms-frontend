import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import { Box, Button } from "@mui/material";
import { BsFillEyeFill } from "react-icons/bs";

import { FaEdit } from "react-icons/fa";
import { FcUnlock } from "react-icons/fc";
import Loader from "../../../common/Loader";
import avatar from "../../../../assets/images/profile-picture.png";

import { useGetEmployeeListQuery } from "../../../../services/employeeApi";
import PasswordUpdateModal from "./PasswordUpdateModal";

const EmployeeTable = () => {
  const { data, isSuccess, isFetching } = useGetEmployeeListQuery();

  const [show, setShow] = useState(false);
  const [paramId, setParamId] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: "small",
      },
      {
        accessorKey: "employee_code", //access nested data with dot notation
        header: "Code",
        size: "small",
      },
      {
        accessorKey: "email", //access nested data with dot notation
        header: "Email",
        size: "small",
      },
      {
        accessorKey: "designation", //access nested data with dot notation
        header: "Designation",
        size: "small",
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
        size: "small",
        Header: <span className="table-header">Status</span>, //optional custom markup
      },

    ],
    []
  );

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    csvExporter.generateCsv(data?.data);
  };

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  return (
    <>
      {isFetching && <Loader />}

      <PasswordUpdateModal
        handleClose={handleClose}
        show={show}
        clickValue="Password Reset"
        paramId={paramId}
      />

      {/* <MaterialReactTable columns={columns} data={data} /> */}
      <MaterialReactTable
        enableRowSelection
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
        muiBottomToolbarProps={{
          style: {
            backgroundColor: "#0D6EFD",
            
           
          },
        }}
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
          >
            <Button
              color="secondary"
              //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
              onClick={handleExportData}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export
            </Button>
            <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              //only export selected rows
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="contained"
              color="secondary"
            >
              Selected Rows
            </Button>
          </Box>
        )}
        // enablePagination="true"
        renderRowActions={(row, index) => (
          <>
            <div className="d-flex">
              <div>
                <Link
                  to="#"
                  // className="btn btn-warning btn-sm"
                  onClick={() => {
                    handleShow();
                    setParamId(row?.row?.original?.user_id);
                  }}
                >
                  <FcUnlock className="mb-1 mr-1" size={24} />
                </Link>
              </div>
              <div>
                <Link
                  to={`/dashboard/approval-authority/employee-details/${row?.row?.original?.id}`}
                >
                  <BsFillEyeFill color="black" size={24} />
                </Link>
              </div>
              <div>
                <Link
                  to={`/dashboard/approval-authority/edit-employee/${row?.row?.original?.id}`}
                  title=""
                  className="px-2"
                >
                  <FaEdit size={22} />
                </Link>
              </div>
            </div>

            {/* <Link to="#" onClick={() => deleteHandel()}>
              <FaTrash size={20} color="red" />
            </Link>{" "} */}
          </>
        )}
      />
    </>
  );
};

export default EmployeeTable;
