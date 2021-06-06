import React from 'react';

import useCalendarStyles from '../useCalendarStyles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Grid } from '@material-ui/core';

const localizer = momentLocalizer(moment)

export default function Schedule (props) {
  const classes = useCalendarStyles();
  const {
    event,
    handleSelectSlot,
    handleSelectEvent
  } = props;
  
  const toolTip = (e) => {
    return e.title;
  } 

  return (
    <Grid xs={10} style={{ marginTop: '25px' }}>
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={['month']}
        view='month'
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        tooltipAccessor={toolTip}
        style={{ height: 780, width: 850 }}
      />
    </Grid>
  );
}
