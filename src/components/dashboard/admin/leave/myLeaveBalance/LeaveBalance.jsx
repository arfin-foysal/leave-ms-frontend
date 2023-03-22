import React from "react";
import { useMyLeaveBalanceListQuery } from "../../../../../services/leaveApplication";
import Loader from "../../../../common/Loader";
import PageTopHeader from "../../../../common/PageTopHeader";
import { SlWallet } from 'react-icons/sl';

const LeaveBalance = () => {
  const res = useMyLeaveBalanceListQuery();
  const { data } = res;
  return (
    <>
      <PageTopHeader title="Leave Balance" />
  
        <div className="col-12">
          <div className=" card card shadow mb-4">
            <div className="card-header py-3 n">
              <div>
                <h6 className="m-0 font-weight-bold text-primary">
               <SlWallet/> Leave Balance List
                </h6>
              </div>
            </div>
            <div className="card-body">
            {res.isFetching && <Loader />}
            
        
            <div className="table-responsive">

           
              <table class="table ">
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
                    <th scope="col">Remaining</th>
                  </tr>
                </thead>
                <tbody>
                {res.isError && <div>Something went wrong</div>}
                {res.isSuccess && data?.data?.balance_list.length === 0 && (
              <div className="text-center">No Data Found</div>
            )}

                  {data?.data?.balance_list?.map((item, i) => (
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
    </>
  );
};

export default LeaveBalance;
