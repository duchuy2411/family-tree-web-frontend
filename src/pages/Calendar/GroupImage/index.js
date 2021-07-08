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
        <Grid xs={12} onClick={() => showImage(0)}>
          <div className="img-1 group-1">
            <img src={arrayImages[0]} />
          </div>
        </Grid>
      )}
      {arrayImages.length === 2 && (
        <>
          <Grid xs={6} onClick={() => showImage(0)}>
            <div className="img-1 group-2">
              <img src={arrayImages[0]} />
            </div>
          </Grid>
          <Grid xs={6} onClick={() => showImage(1)}>
            <div className="img-1 group-2">
              <img src={arrayImages[1]} />
            </div>
          </Grid>
        </>
      )}
      {arrayImages.length >= 3 && (
        <>
          <Grid xs={12} onClick={() => showImage(0)}>
            <div className="img-1 group31">
              <img src={arrayImages[0]}/>
            </div>
          </Grid>
          <Grid xs={6} onClick={() => showImage(1)}>
            <div className="img-1 group32">
              <img src={arrayImages[1]}/>
            </div>
          </Grid>
          <Grid xs={6} className={{ last: arrayImages.length >= 3 }}>
            <div className="img-1 group32">
              <img src={arrayImages[2]}/>
            </div>
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
