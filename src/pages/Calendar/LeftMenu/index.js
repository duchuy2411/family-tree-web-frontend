import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";
import Calendar from "react-calendar";
import useCalendarStyles from "../useCalendarStyles";

import "./index.css";

export default function LeftMenu(props) {
  const classes = useCalendarStyles();
  const { curTree, handleChangeMode, select } = props;
  return (
    <Grid item xs={2}>
      {/* Container of Left Side */}
      <Grid container justify="center" spacing={3}>
        <Grid item xs={12}></Grid>
        {/* Family name */}
        <Grid item xs={11}>
          <Paper elevation={9} className={classes.paperPanel}>
            <Typography align="center" variant="h5" component="p" className={classes.boldTitle}>
              {curTree.name}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={11}>
          <Paper elevation={9} className={classes.calendar}>
            <Calendar />
          </Paper>
        </Grid>
        <Grid item xs={11} className={classes.fullWidth}>
          <Paper elevation={9} className={classes.paperPanel}>
            <Typography align="" variant="h5" component="p">
              <Grid
                item
                xs={12}
                className={`${classes.typeEvent} ${
                  select === "Calendar" ? classes.selectedMode : ""
                }`}
                onClick={() => handleChangeMode("Calendar")}
              >
                <span className="fas fa-calendar-week menu-event"></span>
                <span className="label-left menu-event">Event</span>
              </Grid>
              <Grid
                item
                xs={12}
                className={`${classes.typeEvent} ${
                  select === "Memory" ? classes.selectedMode : ""
                }`}
                onClick={() => handleChangeMode("Memory")}
              >
                <span className="fas fa-calendar-week menu-memory"></span>
                <span className="label-left menu-memory">Memory</span>
              </Grid>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
