import React, { useState, useEffect } from "react";

// import useCalendarStyles from "../useCalendarStyles";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Grid } from "@material-ui/core";

const localizer = momentLocalizer(moment);

export default function Schedule(props) {
  const { handleNavigate, event, handleSelectSlot, handleSelectEvent } = props;

  const toolTip = (e) => {
    return e.title;
  };

  return (
    <Grid xs={10} style={{ marginTop: "25px" }}>
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={["month"]}
        view="month"
        onNavigate={handleNavigate}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        tooltipAccessor={toolTip}
      />
    </Grid>
  );
}
