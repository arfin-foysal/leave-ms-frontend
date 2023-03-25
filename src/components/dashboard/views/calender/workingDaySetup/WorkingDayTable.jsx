import React, { useState, useCallback } from "react";
import WorkingDayModal from "./WorkingDayModal";
import Loader from "./../../../../common/Loader";
import {
  useGetWorkingDayStatusListQuery,
  useTestQuery,
} from "../../../../../services/calenderApi";
import DayRow from "./DayRow";
import { FaEdit } from "react-icons/fa";

const WorkingDayTable = () => {
  const { data, isSuccess, isFetching,isError } = useGetWorkingDayStatusListQuery();

  const [show, setShow] = useState(false);
  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  return (
    <>
      {isFetching && <Loader />}

      <WorkingDayModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />

      <div className="card-body table-responsive">
        <table class="table table-striped">
          <thead
            className=" text-light"
            style={{
              backgroundColor: "#0D6EFD",
            }}
          >
            <tr>
              <th scope="col">Saturday</th>
              <th scope="col">Sunday</th>
              <th scope="col">Monday</th>
              <th scope="col">Tuesday</th>
              <th scope="col">Wednesday</th>
              <th scope="col">Thursday</th>
              <th scope="col">Friday</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
               isError && <div>Something went wrong</div>
            }
            {isSuccess && data?.data?.length === 0 && (
              <div className="text-center">No Data Found</div>
            )}

            {isSuccess && (
              <tr>
                <td>
                  <DayRow
                    day={data?.data?.saturday_status}
                    status={data?.data?.saturday}
                  />
                </td>

                <td>
                  <DayRow
                    day={data?.data?.sunday_status}
                    status={data?.data?.sunday}
                  />
                </td>

                <td>
                  <DayRow
                    day={data?.data?.monday_status}
                    status={data?.data?.monday}
                  />
                </td>
                <td>
                  <DayRow
                    day={data?.data?.tuesday_status}
                    status={data?.data?.tuesday}
                  />
                </td>

                <td>
                  <DayRow
                    day={data?.data?.wednesday_status}
                    status={data?.data?.wednesday}
                  />
                </td>
                <td>
                  <DayRow
                    day={data?.data?.thursday_status}
                    status={data?.data?.thursday}
                  />
                </td>
                <td>
                  <DayRow
                    day={data?.data?.friday_status}
                    status={data?.data?.friday}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm "
                    onClick={() => {
                      handleShow();
                      handelClickValue("Update Day Status");
                      setParamId(data?.data);
                    }}
                  >
                    <FaEdit className="mb-1" />
                    Modify
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default React.memo(WorkingDayTable);
