import React from "react";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SimpleBackdrop = ({ color }) => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color={color} />
      </Backdrop>
    </div>
  );
};

export default React.memo(SimpleBackdrop);
