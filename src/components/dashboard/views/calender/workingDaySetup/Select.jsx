import React from "react";
import { useGetDayTypeListQuery } from "../../../../../services/calenderApi";

const Select = ({ onChange, value, name }) => {
  const res = useGetDayTypeListQuery();
  return (
    <>
      <select
        className="form-control"
        name={name}
        onChange={onChange}
        value={value}
      >
        {res.isSuccess &&
          res?.data?.data?.map((item, i) => (
            <option key={i} value={item.id}>
              {item.title}
            </option>
          ))}
      </select>
    </>
  );
};

export default Select;
