import React from "react";

const DayRow = ({ day, status }) => {
  return (
    <>
      {status === 1 && <span className="text-success fw-bold">{day}</span>}
      {status === 2 && <span className="text-danger fw-bold">{day}</span>}
      {status === 3 && <span className="text-info fw-bold">{day}</span>}
    </>
  );
};

export default DayRow;
