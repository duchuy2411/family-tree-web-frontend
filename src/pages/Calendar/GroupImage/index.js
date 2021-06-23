import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { SHOW_VIEW_IMAGE, SET_ARR_IMAGES } from "../calendarSlice";

const GroupImage = (props) => {
  const { arrayImages } = props;
  const dispatch = useDispatch();
  const showImage = (ind) => {
    dispatch(SHOW_VIEW_IMAGE(ind));
    dispatch(SET_ARR_IMAGES(arrayImages));
  };
  return (
    <Grid container xs={12}>
      {arrayImages.length === 1 && (
        <Grid xs={12} className="group-1" onClick={() => showImage(0)}>
          <div className="img-1" style={{ backgroundImage: `url(${arrayImages[0]})` }} />
        </Grid>
      )}
      {arrayImages.length === 2 && (
        <>
          <Grid xs={6} className="group-2" onClick={() => showImage(0)}>
            <div className="img-1" style={{ backgroundImage: `url(${arrayImages[0]})` }} />
          </Grid>
          <Grid xs={6} className="group-2" onClick={() => showImage(1)}>
            <div className="img-1" style={{ backgroundImage: `url(${arrayImages[1]})` }} />
          </Grid>
        </>
      )}
      {arrayImages.length >= 3 && (
        <>
          <Grid xs={12} className="group31" onClick={() => showImage(0)}>
            <div className="img-1" style={{ backgroundImage: `url(${arrayImages[0]})` }} />
          </Grid>
          <Grid xs={6} className="group32" onClick={() => showImage(1)}>
            <div className="img-1" style={{ backgroundImage: `url(${arrayImages[1]})` }} />
          </Grid>
          <Grid xs={6} className={{ group32: true, last: arrayImages.length >= 3 }}>
            <div className="img-1" style={{ backgroundImage: `url(${arrayImages[2]})` }} />
            {arrayImages.length > 3 && (
              <div className="gray-img" onClick={() => showImage(2)}>
                <div className="more-img">+{arrayImages.length - 3}</div>
              </div>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default GroupImage;
