import React from "react";
import _ from "lodash";
import moment from "moment";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import { deleteMemory, selectStatusCreating } from "../calendarSlice";
import GroupImage from "../GroupImage";

const CardList = (props) => {
  const { arrMemory } = props;
  const dispatch = useDispatch();
  const creating = useSelector(selectStatusCreating);
  const handleClickDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const rs = await handleDeleteMemory(id);
        if (rs) {
          swal("Your memory has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Something error!", {
            icon: "error",
          });
        }
      }
    });
  };

  const handleDeleteMemory = (id) => {
    return dispatch(deleteMemory(id));
  };

  const getName = (object) => {
    if (!_.get(object, "firstName")) return null;
    const name = `${_.get(object, "firstName", " ") || ""}  ${
      _.get(object, "midName", " ") || ""
    } ${_.get(object, "lastName", "") || " "}`;
    return name.trim() !== "" ? name : "Unknow name";
  };

  const avtUrl = JSON.parse(localStorage.getItem("origin-keeper-auth"));
  return (
    <React.Fragment className="scrollabel">
      {creating && (
        <Grid container xs={7} className="container-spinner">
          <i className="fas fa-spinner fa-pulse"></i>
          <i className="fas fa-spinner fa-pulse"></i>
          <i className="fas fa-spinner fa-pulse"></i>
        </Grid>
      )}
      {arrMemory && arrMemory.map((ele) => (
        <Grid key={ele.id} container xs={12} className="container-card list">
          <Grid item xs={1} className="avatar-card">
            <img src={_.get(ele, "creator.avatarUrl") || _.get(avtUrl, "user.avatarUrl")} />
          </Grid>
          <Grid item xs={9} className="info-card">
            <div className="name-card">
              {getName(_.get(ele, "creator")) || getName(_.get(avtUrl, "user"))}
            </div>
            <div className="time-card">{moment(ele.memoryDate).format("DD-MM-YYYY")}</div>
          </Grid>
          <Grid item xs={1} className="more-card" onClick={() => handleClickDelete(ele.id)}>
            <div className="fas fa-trash"></div>
          </Grid>
          <Grid item xs={12} className="content-card">
            {ele.description}
          </Grid>
          <Grid item xs={12}>
            <GroupImage arrayImages={ele.imageUrls} />
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default CardList;
