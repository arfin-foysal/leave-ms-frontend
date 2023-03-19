import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "./Calender.css";
const Calender = ({ res }) => {
  const [calenderSummary, setCalenderSummary] = useState([]);

  useEffect(() => {
    let arr = [];
    res?.data?.data?.weekend_holiday?.map((item) => {
      let title;
      if (item.day_note) {
        title = `${item.day_type_title} (${item.day_note})`;
      } else {
        title = item.day_type_title;
      }

      arr.push({
        title: title,
        start: item.date,
        end: item.date,
        color: item.day_note ? "DodgerBlue" : "Orange",
        // color: item.day_type_title === "Weekend" ? "orange" : "info",
      });
      return setCalenderSummary(arr);
    });

    res?.data?.data?.leave_list?.map((item) => {
      let title;
      let color;
      if (item.leave_title) {
        title = `${item.leave_title} (${item.leave_status})`;
      } else {
        title = item.leave_title;
      }
      if (item.leave_status === "Approved") {
        color = "green";
      } else if (item.leave_status === "Rejected") {
        color = "red";
      } else {
        color = "SaddleBrown";
      }

      arr.push({
        title: title,
        start: item.start_date,
        end: item.end_date,
        color: color,
      });
      return setCalenderSummary(arr);
    });
  }, [res]);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calenderSummary}
        editable={true}
        selectable={true}
        eventTextColor="white"
        handleWindowResize={true}
        // height={650}
        contentHeight={600}

        
      />
    </>
  );
};

export default Calender;
