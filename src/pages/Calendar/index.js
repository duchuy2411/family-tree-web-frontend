import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

import LeftMenu from "./LeftMenu";
import Schedule from "./Schedule";
import Memory from "./Memory";
import Modal from "./Modal";
import ViewImage from "./ViewImage";

import {
  fetchCalendar,
  selectViewImage,
  selectArrayViewImages,
  createCalendar,
  updateCalendar,
  deleteCalendar,
} from "./calendarSlice";
import { selectTree, selectTrees, fetchTreesAndSetCurrent } from "../Home/homeSlice";

import useCalendarStyles from "./useCalendarStyles";
import UtilCalendar from "./utilCalendar";

import "./index.css";

export default function CalendarPage() {
  const classes = useCalendarStyles();
  const dispatch = useDispatch();
  const showViewImage = useSelector(selectViewImage);
  const [calendar, setCalendar] = useState();
  const [form, setForm] = useState({ notes: "", startDate: null, endDate: null, loop: 0 });
  const [show, setShow] = useState({ isShow: false, mode: "new" });
  const [select, setSelect] = useState("Calendar");
  const [event, setEvent] = useState([]);
  const [view, setView] = useState();
  const arrayImages = useSelector(selectArrayViewImages);
  const { id } = useParams();
  const curTree = useSelector(selectTree);
  const listTree = useSelector(selectTrees);
  

  useEffect(async () => {
    const calendar = await dispatch(fetchCalendar(id));                                                       
    if (calendar) {
      setCalendar(calendar);
      const getyear = moment().year();
      setView(getyear);
      const rs = UtilCalendar.init(calendar, moment(`${getyear}-01-01`), moment(`${getyear + 1}-01-01`));
      const mapCalendar = _.map(rs, ele => ({
        start: ele.startDate,
        end: ele.endDate,
        title: ele.note,
        reminderOffest: ele.reminderOffest,
        repeat: ele.repeat,
        id: ele.id,
      }));
      setEvent(mapCalendar);
    }
    dispatch(fetchTreesAndSetCurrent(id));
  }, []);

  const handleNavigate = async (date) => {
    const year = moment(date).year();
    if (year !== view) {
      const getCalendar = await dispatch(fetchCalendar(id));
      setCalendar(getCalendar);
      const rs = UtilCalendar.init(getCalendar, moment(`${year}-01-01`), moment(`${year + 1}-01-01`));
      const mapCalendar = _.map(rs, ele => ({
        start: ele.startDate,
        end: ele.endDate,
        title: ele.note,
        reminderOffest: ele.reminderOffest,
        repeat: ele.repeat,
        id: ele.id,
      }));
      setEvent(mapCalendar);
      setView(year);
    }
  };

  const handleSelectSlot = (e) => {
    setForm({
      notes: "",
      startDate: moment(e.start).format("YYYY-MM-DD"),
      endDate: moment(e.end),
      loop: 0,
    });
    setShow({ isShow: true, mode: "new" });
  };

  const handleSelectEvent = (e) => {
    setForm({ id: e.id, notes: e.title, startDate: e.start, endDate: e.end, loop: e.repeat, reminder: e.reminderOffest });
    setShow({ isShow: true, mode: "upd" });
  };

  const handleSave = async () => {
    setShow({ ...show, isShow: false });
    switch (show.mode) {
    case "new": {
      const newEvent = {
        note: form.notes,
        startDate: moment(form.startDate).add(1, "day"),
        endDate: moment(form.endDate),
        repeat: form.loop,
        reminderOffest: form.reminder,
        familyTreeId: id,
      };
      const rs = await dispatch(createCalendar(newEvent));
      if (rs) {
        const getCalendar = await dispatch(fetchCalendar(id));                                                       
        if (getCalendar) {
          setCalendar(getCalendar);
          const rs = UtilCalendar.init(getCalendar, moment(`${view}-01-01`), moment(`${view + 1}-01-01`));
          const mapCalendar = _.map(rs, ele => ({
            start: ele.startDate,
            end: ele.endDate,
            title: ele.note,
            reminderOffest: ele.reminderOffest,
            repeat: ele.repeat,
            id: ele.id,
          }));
          swal("Your memory has been created!", {
            icon: "success",
          });
          setEvent(mapCalendar);
        }
      }
      break;
    }
    case "upd": {
      const updEvent = {
        note: form.notes,
        reminderOffest: form.reminder,
      };
      const rs = await dispatch(updateCalendar(form.id, updEvent));
      if (rs) {
        const getCalendar = await dispatch(fetchCalendar(id));                                                       
        if (getCalendar) {
          setCalendar(getCalendar);
          const rs = UtilCalendar.init(getCalendar, moment(`${view}-01-01`), moment(`${view + 1}-01-01`));
          const mapCalendar = _.map(rs, ele => ({
            start: ele.startDate,
            end: ele.endDate,
            title: ele.note,
            reminderOffest: ele.reminderOffest,
            repeat: ele.repeat,
            id: ele.id,
          }));
          swal("Your memory has been updated!", {
            icon: "success",
          });
          setEvent(mapCalendar);
        }
      }
      break;
    }
    default: {
      break;
    }
    }
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
    case "reminder": {
      setForm({ ...form, reminder: e.target.value });
      break;
    }
    default: {
      break;
    }
    }
  };

  const handleDelete = async () => {
    const select = form.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this event!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const rs = dispatch(deleteCalendar(select));
        if (rs) {
          swal("Your memory has been deleted!", {
            icon: "success",
          });
          setEvent(_.filter(event, ele => ele.id !== select));
        }
      }
    });
    setShow({ ...show, isShow: false });
  };

  return (
    <Container maxWidth="xl" disableGutters className={classes.container}>
      <Grid container direction="row">
        <LeftMenu curTree={curTree} select={select} listTree={listTree} handleChangeMode={handleChangeMode} />
        {select === "Calendar" && (
          <Schedule
            event={event}
            handleNavigate={handleNavigate}
            handleSelectSlot={handleSelectSlot}
            handleSelectEvent={handleSelectEvent}
          />
        )}
        {select === "Memory" && <Memory />}
        {show.isShow && (
          <Modal
            form={form}
            show={show}
            handleDelete={handleDelete}
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
