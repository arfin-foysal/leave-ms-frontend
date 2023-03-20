import React, { useState } from "react";

import avatar from "../../../../../assets/images/profile-picture.png";

import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Moment from "react-moment";
import "./Leave.css";
import {
  useApproveLeaveMutation,
  useGetApplicationDetailsByIDQuery,
} from "../../../../../services/leaveApplication";
import Loader from "../../../../common/Loader";
import PageTopHeader from "../../../../common/PageTopHeader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RejectionModal from "./RejectionModal";

const LeaveDetails = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const res = useGetApplicationDetailsByIDQuery(id);
  const [approveLeave] = useApproveLeaveMutation();
  const { data } = res;

  console.log(res);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const permitHandaler = data?.data?.leave_flow?.map((item) => {
    let isAppruvalPermits = false;

    if (item.step_flag === "Active" && item.approval_user_id === authUser.id) {
      isAppruvalPermits = true;
    }
    return isAppruvalPermits;
  });

  const handleApprove = async () => {
    try {
      const result = await approveLeave({
        leave_application_id: id,
      }).unwrap();
      toast.success(result.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const confirmHandel = async (icon, buttonTxt, ButtonClr, Did, funC) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: icon,
      confirmButtonColor: ButtonClr,
      cancelButtonColor: "#4e4e4e",
      confirmButtonText: "Yes," + buttonTxt + "!",
      width: 200,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        funC(Did);
        // deleteFunc(Did);
        Swal.fire("success");
      }
    });
  };

  return (
    <>
      <RejectionModal
        handleClose={handleClose}
        show={show}
        clickValue="Do you want to reject?"
        paramId={id}
      />

      <PageTopHeader title="Leave Information" />
      <div className="card shadow mb-4">
        <div className="card-header py-3 n">
          {data?.data?.leave_count_on_this_day === 2 && (
            <div class="alert alert-danger" role="alert">
              Already{data?.data?.leave_count_on_this_day} leave(s) has been approved on this date!
            </div>
          )}

          <div>
            <h6 className="m-0 font-weight-bold text-primary">
              Leave Information
            </h6>
          </div>
        </div>

        {res.isFetching && <Loader />}

        <div className="card-body">
          <div className="py-2 text-right mr-1">
            <div className="d-flex justify-content-end">
              <div className="mt-1"></div>
            </div>
          </div>
          <div className=" row d-flex">
            <div className="col-md-6 ">
              <div className=" card card shadow mb-4">
                <div className="card-header py-3 ">
                  <div>
                    <h6 className="m-0 p-1 font-weight-bold text-primary">
                      Employee Information
                    </h6>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex justify-content-center ">
                        <img
                          className="border border-4 p-3 m-2"
                          src={
                            data?.data?.employee?.image !== null
                              ? `${process.env.REACT_APP_FILE_URL}${data?.data?.employee?.image} `
                              : avatar
                          }
                          width={180}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Applicant's Name</th>
                            <th scope="col">{data?.data?.employee?.name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Designation</td>
                            <td>{data?.data?.employee?.designation}</td>
                          </tr>
                          <tr>
                            <td>Department</td>
                            <td>{data?.data?.employee?.department}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{data?.data?.employee?.email}</td>
                          </tr>

                          <tr>
                            <td>Mobile</td>
                            <td>{data?.data?.employee?.email}</td>
                          </tr>
                          <tr>
                            <td>Blood Group</td>
                            <td>{data?.data?.employee?.blood_group}</td>
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td>{data?.data?.employee?.gender}</td>
                          </tr>
                          <tr>
                            <td>Joining Date</td>

                            <td>
                              <Moment format="dddd, DD MMM, YYYY">
                                {data?.data?.employee?.joining_date}
                              </Moment>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 ">
              <div className=" card card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between">
                  <div>
                    <h6 className="m-0 font-weight-bold text-primary">
                      Leave Information
                    </h6>
                  </div>
                  <div>
                    {data?.data?.leave?.leave_status === "Pending" && (
                      <td>
                        <span className="badge rounded-pill bg-warning text-light">
                          {data?.data?.leave?.leave_status}
                        </span>
                      </td>
                    )}
                    {data?.data?.leave?.leave_status === "Approved" && (
                      <td>
                        <span className="badge rounded-pill bg-success text-light">
                          {data?.data?.leave?.leave_status}
                        </span>
                      </td>
                    )}
                    {data?.data?.leave?.leave_status === "Rejected" && (
                      <td>
                        <span className="badge rounded-pill bg-danger text-light">
                          {data?.data?.leave?.leave_status}
                        </span>
                      </td>
                    )}
                  </div>
                </div>
                <div className="col-12 mt-3 ">
                  <div className="table-responsive">
                    <table class="table ">
                      <thead
                        className="text-light rounded"
                        style={{
                          backgroundColor: "#0D6EFD",
                        }}
                      >
                        <tr>
                          <th scope="col">Leave Type</th>
                          <th scope="col">{data?.data?.leave?.leave_title}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Start Date</td>
                          <td>
                            <Moment format="dddd, DD MMM, YYYY">
                              {data?.data?.leave?.start_date}
                            </Moment>
                          </td>
                        </tr>
                        <tr>
                          <td>End Date</td>
                          <td>
                            <Moment format="dddd, DD MMM, YYYY">
                              {data?.data?.leave?.end_date}
                            </Moment>
                          </td>
                        </tr>
                        <tr>
                          <td>Applied For</td>
                          <td>{data?.data?.leave?.total_applied_days} Days</td>
                        </tr>

                        <tr>
                          <td>Is Half Day</td>
                          {data?.data?.leave?.is_half_day ? (
                            <td className="badge rounded-pill bg-success mt-1">
                              Yes ({data?.data?.leave?.half_day})
                            </td>
                          ) : (
                            <td className="badge rounded-pill bg-info mt-1">
                              No
                            </td>
                          )}
                        </tr>
                        <tr>
                          <td>Reason</td>
                          <td>{data?.data?.leave?.leave_reason}</td>
                        </tr>

                        {data?.data?.leave?.rejection_cause && (
                          <tr>
                            <td>Rejection Cause</td>
                            <td>{data?.data?.leave?.rejection_cause}</td>
                          </tr>
                        )}

                        <tr>
                          <td>Responsibility Carried By</td>

                          {data?.data?.leave?.responsibility_carried_by ==
                            null && <td className=" mt-1">Self</td>}

                          {data?.data?.leave?.responsibility_carried_by !==
                            null && (
                            <td className="badge rounded-pill bg-success mt-1">
                              {data?.data?.leave?.responsibility_carried_by}
                            </td>
                          )}
                        </tr>
                        <tr>
                          <td>Applied Date</td>
                          <td>
                            <Moment format="MMMM Do YYYY, h:mm:ss a">
                              {data?.data?.leave?.applied_date}
                            </Moment>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {permitHandaler?.includes(true) && (
                <div id="permitBtn" className=" card card shadow mb-4">
                  <div className="card-body">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        class="btn btn-success me-md-2"
                        type="button"
                        onClick={() =>
                          confirmHandel(
                            "info",
                            "Approved",
                            "#4BB543",
                            id,
                            handleApprove
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        class="btn btn-danger"
                        type="button"
                        onClick={() => {
                          handleShow();
                          // setParamId(row?.row?.original?.user_id);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" row ">
            <div className="col-12">
              <div className=" card card shadow mb-4">
                <div className="card-header py-3 n">
                  <div>
                    <h6 className="m-0 font-weight-bold text-primary">
                      Leave Status
                    </h6>
                  </div>
                </div>
                <div className="card-body">
                  <div className=" table-responsive">
                    <table class="table">
                      <thead
                        className=" text-light"
                        style={{
                          backgroundColor: "#0D6EFD",
                        }}
                      >
                        <tr>
                          <th scope="col">Authority</th>
                          <th scope="col">Approval Status</th>
                          <th scope="col">Step</th>
                          <th scope="col">Step Flag</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.length === 0 && (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        )}
                        {data?.data?.leave_flow?.map((item, i) => (
                          <tr key={i}>
                            <td>{item.authority_name}</td>

                            {item.approval_status === "Approved" && (
                              <td>
                                <span className="badge rounded-pill bg-success text-light">
                                  {item.approval_status}
                                </span>
                              </td>
                            )}

                            {item.approval_status === "Pending" && (
                              <td>
                                <span className="badge rounded-pill bg-warning text-light">
                                  {item.approval_status}
                                </span>
                              </td>
                            )}
                            {item.approval_status === "Rejected" && (
                              <td>
                                <span className="badge rounded-pill bg-danger text-light">
                                  {item.approval_status}
                                </span>
                              </td>
                            )}

                            <td>{item.step}</td>

                            {item.step_flag === "Active" && (
                              <td>
                                <span className="badge rounded-pill bg-info text-light">
                                  {item.step_flag}
                                </span>
                              </td>
                            )}

                            {item.step_flag === "Pending" && (
                              <td>
                                <span className="badge rounded-pill bg-warning text-light">
                                  {item.step_flag}
                                </span>
                              </td>
                            )}

                            {item.step_flag === "Completed" && (
                              <td>
                                <span className="badge rounded-pill bg-success">
                                  {item.step_flag}
                                </span>
                              </td>
                            )}

                            <td>
                              <Moment format="dddd, DD MMM, YYYY">
                                {item.updated_at}
                              </Moment>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className=" card card shadow mb-4">
                <div className="card-header py-3 n">
                  <div>
                    <h6 className="m-0 font-weight-bold text-primary">
                      Leave Balance
                    </h6>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table class="table">
                      <thead
                        className=" text-light"
                        style={{
                          backgroundColor: "#0D6EFD",
                        }}
                      >
                        <tr>
                          <th scope="col">Leave Type</th>
                          <th scope="col">Total Days</th>
                          <th scope="col">Avail Days</th>
                          <th scope="col">Remmaining</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.length === 0 && (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        )}
                        {data?.data?.leave_balances?.map((item, i) => (
                          <tr key={i}>
                            <td>
                              {item.leave_title} ({item.leave_short_code})
                            </td>
                            <td>{item.total_days}</td>
                            <td>{item.availed_days}</td>
                            <td>{item.remaining_days}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveDetails;
