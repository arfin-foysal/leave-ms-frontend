import React, {  useMemo } from "react";
import MaterialReactTable from "material-react-table";


import Loader from "../../../common/Loader";
import avatar from "../../../../assets/images/profile-picture.png";

import { useGetOffboardedEmployeeListQuery } from "../../../../services/employeeApi";
import  Moment  from "react-moment";

const OffboardedEmployeeTable = () => {
  const { data, isSuccess, isFetching } = useGetOffboardedEmployeeListQuery();


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
      },
      {
        accessorKey: "employee_code", //access nested data with dot notation
        header: "Code",
      },

      {
        accessorKey: "mobile", //normal accessorKey
        header: "Number",
      },
      {
        accessorKey: "email", //normal accessorKey
        header: "Email",
      },
      {
        accessorFn: (row) =>
          row.designation && (
            <>
              <span>
                {row.designation}
                <br />
                <b>Dpet. : </b>
                {row.department}
              </span>
            </>
          ), //alternate way
        id: "designation", //id required if you use accessorFn instead of accessorKey
        header: "Designation",
        size: "small",
        Header: <span className="table-header">Designation</span>, //optional custom markup
      },
      {
        accessorFn: (row) =>
          row.stuckoff_date && (
            <>
         
                <Moment format="dddd, DD MMM, YYYY">
                  {row.stuckoff_date}
                </Moment>
           
            </>
          ), //alternate way
        id: "stuckoff_date", //id required if you use accessorFn instead of accessorKey
        header: "Offboarding Date",
        size: "small",
        Header: <span className="table-header">Offboarding Date</span>, //optional custom markup
      },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}

      <MaterialReactTable
        columns={columns}
        data={isSuccess && data?.data}
        positionActionsColumn="last"
        muiTopToolbarProps={{
          style: {
            backgroundColor: "#0D6EFD",
          },
        }}
        // enablePagination="true"
      />
    </>
  );
};

export default React.memo(OffboardedEmployeeTable);
