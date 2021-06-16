import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import moment from "moment";
import { useSelector } from "react-redux";
import _ from "lodash";

import LeftMenu from "./LeftMenu";
import Schedule from "./Schedule";
import Memory from "./Memory";
import Modal from "./Modal";
import ViewImage from "./ViewImage";

import {
  // fetchCalendar,
  selectViewImage,
  selectArrayViewImages,
} from "./calendarSlice";
import useCalendarStyles from "./useCalendarStyles";
// import UtilCalendar from './utilCalendar';

import "./index.css";

export default function CalendarPage() {
  const classes = useCalendarStyles();
  // const dispatch = useDispatch();
  const showViewImage = useSelector(selectViewImage);
  const [form, setForm] = useState({ notes: "", startDate: null, endDate: null, loop: 0 });
  const [show, setShow] = useState({ isShow: false, mode: "new" });
  const [select, setSelect] = useState("Calendar");
  const [event, setEvent] = useState([]);
  const arrayImages = useSelector(selectArrayViewImages);

  // useEffect(() => {
  //   const calendar = await dispatch(fetchCalendar(17));
  //   if (calendar.data) {
  //     const parseEvent = UtilCalendar.formatApi(calendar.data);
  //     console.log("Parse event: ", parseEvent);
  //   }
  // }, [])

  const handleSelectSlot = (e) => {
    console.log("Select slot", e);
    setForm({
      notes: "",
      startDate: moment(e.start).format("YYYY-MM-DD"),
      endDate: moment(e.end).format("YYYY-MM-DD"),
      loop: 0,
    });
    setShow({ isShow: true, mode: "new" });
  };

  const handleSelectEvent = (e) => {
    console.log("Select event", e);
    setForm({ id: e.id, notes: e.title, startDate: e.start, endDate: e.end, loop: 0 });
    setShow({ isShow: true, mode: "upd" });
  };

  const handleSave = () => {
    setShow({ ...show, isShow: false });
    const curEvent = [...event];
    switch (show.mode) {
    case "new": {
      curEvent.push({
        id: curEvent.length + 1,
        title: form.notes,
        start: moment(form.startDate).format(),
        end: moment(form.endDate).format(),
      });
      console.log("curEvent", curEvent);

      break;
    }
    case "upd": {
      const index = _.findIndex(curEvent, (ele) => ele.id === form.id);

      curEvent[index] = {
        ...curEvent[index],
        title: form.notes,
        start: moment(form.startDate).format(),
        end: moment(form.endDate).format(),
      };

      break;
    }
    default: {
      break;
    }
    }
    setEvent(curEvent);
  };

  const handleCancel = () => {
    setShow({ isShow: false });
  };

  const handleChangeMode = (label) => {
    setSelect(label);
  };

  const handleChangeForm = (e, label) => {
    switch (label) {
    case "notes": {
      setForm({ ...form, notes: e.target.value });
      break;
    }
    case "start": {
      setForm({ ...form, startDate: e.target.value });
      break;
    }
    case "end": {
      setForm({ ...form, endDate: e.target.value });
      break;
    }
    case "loop": {
      setForm({ ...form, loop: e.target.value });
      break;
    }
    default: {
      break;
    }
    }
  };

  return (
    <Container maxWidth="xl" disableGutters className={classes.container}>
      <Grid container direction="row">
        <LeftMenu handleChangeMode={handleChangeMode} />
        {select === "Calendar" && (
          <Schedule
            event={event}
            handleSelectSlot={handleSelectSlot}
            handleSelectEvent={handleSelectEvent}
          />
        )}
        {select === "Memory" && <Memory />}
        {show.isShow && (
          <Modal
            form={form}
            handleChangeForm={handleChangeForm}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        )}
        {showViewImage.isShow && <ViewImage arrayImages={arrayImages} />}
      </Grid>
    </Container>
  );
}
