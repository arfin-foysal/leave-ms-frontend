import React from "react";

import { Link } from "react-router-dom";

import Moment from "react-moment";
import Loader from "../../../../common/Loader";
import { useGetApprovalPendingApplicationListQuery } from "../../../../../services/leaveApplication";
import PageTopHeader from "../../../../common/PageTopHeader";
import { BsFillEyeFill, BsHourglassSplit } from "react-icons/bs";
import { IoSyncCircle } from "react-icons/io5";

const PendingLeaveList = () => {
  const res = useGetApprovalPendingApplicationListQuery();
  const { data, isError, isFetching } = res;

  const refatchClick = () => {
    res.refetch();
  };

  return (
    <>
      <PageTopHeader title="Pending List" />
      <div className="card shadow mb-4">
        <div className="card-header d-flex justify-content-between">
          <div>
            <h6 className="m-0 font-weight-bold text-primary">
            <BsHourglassSplit/>  Pending Leave List
            </h6>
          </div>
          <div>
            <IoSyncCircle
              className="cursor "
              color="black"
              size={25}
              onClick={() => refatchClick()}
            />
          </div>
        </div>

        <div className="card-body">
          {isFetching && <Loader />}
          <div className="table-responsive">
            <table class="table">
              <thead
                className=" text-light"
                style={{
                  backgroundColor: "#0D6EFD",
                }}
              >
                <tr>
                  <th scope="col">Applicant</th>
                  <th scope="col">Leave Type</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Applied For</th>
                  <th scope="col">Is Half Day</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {isError && <div>Something went wrong</div>}

                {data?.data?.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Pending leave application found!
                    </td>
                  </tr>
                )}

                {data?.data?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.employee_name}</td>
                    <td>{item.leave_title}</td>
                    <td>
                      <Moment format="YYYY/MM/DD">{item.start_date}</Moment>
                    </td>
                    <td>
                      <Moment format="YYYY/MM/DD">{item.end_date}</Moment>
                    </td>
                    <td>{item.total_applied_days} Days</td>

                    {item.is_half_day ? (
                      <td>
                        <span className="badge rounded-pill bg-success">
                          Yes ({item.half_day})
                        </span>
                      </td>
                    ) : (
                      <td className=" mt-1">
                        <span className="badge rounded-pill bg-info">No</span>
                      </td>
                    )}

                    {item.leave_status === "Pending" ? (
                      <td>
                        <span className="badge rounded-pill bg-warning text-dark">
                          {item.leave_status}
                        </span>
                      </td>
                    ) : (
                      <td>
                        <span className="badge rounded-pill bg-success">
                          {item.leave_status}
                        </span>
                      </td>
                    )}

                    <td>
                      <Link
                        className="btn btn-info btn-sm  text-white"
                        to={`/dashboard/approval-authority/leave-details/${item.id}`}
                      >
                        <div>
                          <BsFillEyeFill color="white" size={16} />
                          <span className="ms-1">Details</span>
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingLeaveList;
