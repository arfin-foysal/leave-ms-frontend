import React from "react";
import TopBox from "./TopBox";
import { GiSandsOfTime } from "react-icons/gi";
import { FcApproval } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { BsStack } from "react-icons/bs";
import Calender from "./Calender";
import Moment from "react-moment";
import Loader from "../../../common/Loader";
import { useGetDashboardSummaryQuery } from "../../../../services/calenderApi";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const authUser = useSelector((state) => state.auth.user);
  const res = useGetDashboardSummaryQuery();
  const { data, error, isLoading, isFetching } = res;


  let day;
  const today = new Date();
  const curHr = today.getHours();

  if (curHr < 12) {
    day = "Good Morning 🌄 ";
  } else if (curHr < 18) {
    day = "Good Afternoon 🌇";
  } else {
    day = "Good Evening 🌃";
  }





  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <div className="d-none d-sm-inline-block p-1 rounded font-weight-bold shadow-sm">
          {day}
          {authUser?.name.split(" ")[1]}
        </div>
      </div>

      {isFetching && <Loader />}

      <div className="row">
        <TopBox
          name="Total Applications"
          color="blue"
         
          icon={<BsStack color="blue" size={25} />}
          item={data?.data?.count_total}
        />

        <TopBox
          name="Approved Applications"
          color="green"
          icon={<FcApproval size={35} />}
          item={data?.data?.count_approved}
        />

        <TopBox
          name="Pending Applications"
          color="#FFCC00"
          icon={<GiSandsOfTime color="#FFCC00" size={35} />}
          item={data?.data?.count_pending}
        />

        <TopBox
          name="Rejected Applications"
          color="red"
          icon={<ImCross color="red" size={25} />}
          item={data?.data?.count_rejected}
        />
      </div>


      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4 border-0">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Academic Calendar
              </h6>
            </div>
            <div className="card-body">
              <Calender res={res} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Leave Application List
              </h6>
            </div>

            <div className="card-body table-responsive">
              {isLoading && <Loader />}
              <table className="table table-striped">
                <thead
                  className=" text-light"
                  style={{
                    backgroundColor: "#0D6EFD",
                  }}
                >
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Days</th>
                    <th scope="col">Is Half Day</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {error && <>Something went wrong</>}

                  {data?.data?.leave_list?.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">
                        <>No Leave Applied!</>
                      </td>
                    </tr>
                  )}
                  {data?.data?.leave_list?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.leave_title}</td>
                        <td>
                          <Moment format="DD/MM/YYYY">{item.start_date}</Moment>
                        </td>
                        <td>
                          <Moment format="DD/MM/YYYY">{item.end_date}</Moment>
                        </td>
                        <td>{item.total_applied_days} Dayes</td>
                        {item.is_half_day ? (
                          <td>
                            <span className="badge rounded-pill bg-success">
                              Yes ({item.half_day})
                            </span>
                          </td>
                        ) : (
                          <td className=" mt-1">
                            <span className="badge rounded-pill bg-info">
                              No
                            </span>
                          </td>
                        )}
                    
                        {item.leave_status === "Pending" && (
                          <td>
                            <span className="badge rounded-pill bg-warning text-light">
                              {item.leave_status}
                            </span>
                          </td>
                        )}
                        {item.leave_status === "Rejected" && (
                          <td>
                            <span className="badge rounded-pill bg-danger text-light">
                              {item.leave_status}
                            </span>
                          </td>
                        )}
                        {item.leave_status === "Approved" && (
                          <td>
                            <span className="badge rounded-pill bg-success text-light">
                              {item.leave_status}
                            </span>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card shadow mb-4 border-0">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                {" "}
                Leave Balance
              </h6>
            </div>
            <div className="card-body table-responsive">
              {isLoading && <Loader />}
              <table class="table table-striped">
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

                {error && <>Something went wrong</>}
                {data?.data?.balance_list.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Leave Balance!
                    </td>
                  </tr>
                )}
                <tbody>
                  {data?.data?.balance_list?.map((item, i) => (
                    <tr key={i}>
                      <td>
                        {item.leave_title}({item.leave_short_code})
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
    </>
  );
};

export default AdminPage;
