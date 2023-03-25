import React from "react";
import { useGetApprovalAuthorityListQuery } from "../../../../../services/employeeApi";

const StepSelect = ({ onChange, value, name,step }) => {
  const res = useGetApprovalAuthorityListQuery();

  return (
    <>
      <label className="form-label"> {step===0&& `${step+1}st`} {step===1&& `${step+1}nd`} {step===2&& `${step+1}nd`} Step</label>
      <select
             className="form-control"
             name={name}
             onChange={onChange}
             value={value}
      >
        <option value="">Select Authority</option>
        {res.isSuccess &&
          res?.data?.data?.map((item, i) => (
            <option key={i} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>

    </>
  );
};

export default StepSelect;
