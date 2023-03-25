import React from "react";

const LeaveTypeDetails = ( {item} ) => {

  console.log(item)


  return (
    <>
    
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="row">
      
              <div className="col-8">
                <p>
                Leave Title:
                  <span className="font-weight-bold text-primary ">{item.leave_title}</span>
                </p>
                <p>
                Leave Short Code:
                  <span className="font-weight-bold text-primary ">{item.leave_short_code}</span>
                </p>
                <p>
                Total Days:
                  <span className="font-weight-bold text-primary ">{item.total_days} </span>
                </p>
                <p>
                Max Carry Forward Days:
                  <span className="font-weight-bold text-primary">{item.max_carry_forward_days} </span>
                </p>
          
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-12">
                <p>
                Document Upload After Days:
                  <span className="font-weight-bold text-primary">{item.document_upload_after_days}</span>
                </p>
                <p>
                Applicable For:
                  <span className="font-weight-bold text-primary">{item.applicable_for}</span>
                </p>

             
                <p>
                Ts Leave Cut Applicable:
              <span className="font-weight-bold text-primary">
                {" "}
                {item.is_leave_cut_applicable === true ? "Active" : "Inactive"}
              </span>
            </p>
      
         
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveTypeDetails;
