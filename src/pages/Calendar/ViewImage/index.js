import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  HIDE_VIEW_IMAGE,
  // NEXT_IMAGE,
  // PREV_IMAGE,
  selectViewImage,
} from "../calendarSlice";
import { Grid } from "@material-ui/core";

const ShowImage = (props) => {
  const { curImg } = props;
  // const dispatch = useDispatch();

  // const hide = () => {
  //   dispatch(HIDE_VIEW_IMAGE());
  // };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100%",
        height: "700px",
        opacity: 1,
        position: "relative",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <img src={curImg} style={{ maxWidth: "100%", maxHeight: "100%", position: "relative" }}/>
    </div>
  );
};

const ViewImage = (props) => {
  const { arrayImages } = props;

  const dispatch = useDispatch();
  const current = useSelector(selectViewImage);
  const [cur, setCur] = useState(current.current);

  useEffect(() => {
    function logKey(e) {
      if (e.keyCode === 37) {
        clickBack();
      }
      if (e.keyCode === 39) {
        clickNext();
      }
    }
    document.addEventListener("keyup", logKey);
    return () => {
      document.removeEventListener("keyup", logKey);
    };
  });

  const clickBack = () => {
    if (cur !== 0) {
      //dispatch(PREV_IMAGE())
      setCur(cur - 1);
    }
  };

  const clickNext = () => {
    if (cur !== arrayImages.length - 1) {
      //dispatch(NEXT_IMAGE())
      setCur(cur + 1);
    }
  };

  const hide = () => {
    dispatch(HIDE_VIEW_IMAGE());
  };

  const handlePress = (e) => {
    //console.log(e.target.value);
  };

  return (
    <Grid container xs={12} className="container-view-img" onKeyPress={handlePress}>
      <div onClick={hide} className="grayout-view-img"></div>
      <Grid item xs={2} className="child-container">
        <div className="fas fa-chevron-left navi-view-img" onClick={clickBack} />
      </Grid>
      <Grid item xs={8} className="img-view child-container">
        <ShowImage curImg={arrayImages[cur]} />
      </Grid>
      <Grid item xs={2} className="child-container">
        <div className="fas fa-chevron-right navi-view-img" onClick={clickNext} />
        <div className="fas fa-times-circle btn-exit-view" onClick={hide}></div>
      </Grid>
    </Grid>
  );
};

export default ViewImage;
