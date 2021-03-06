import React from "react";
import moment from "moment";
import _ from "lodash";
import { TextField, Button, Grid, MenuItem } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import CONSTANTS from "../../../utils/const";
import "../index.css";
import useCalendarStyles from "../useCalendarStyles";
import colors from "assets/colorPalette";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue2,
    },
    secondary: {
      main: colors.blue5,
    },
  },
});

function Modal(props) {
  const { error, show, form, handleChangeForm, handleSave, handleCancel, handleDelete } = props;

  const classes = useCalendarStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div className="modal">
        <div className="grayout" onClick={handleCancel}></div>
        <div className="modal-form modal-calendar">
          <Grid container justify="center">
            <Grid item xs={12} spacing={1} container>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  variant="outlined"
                  type="text"
                  value={form.notes}
                  className={classes.textField}
                  onChange={(e) => handleChangeForm(e, "notes")}
                />
                <div className={classes.textError}>{_.get(error, "firstName", "")}</div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Start date"
                  type="date"
                  variant="outlined"
                  disabled={show.mode === "upd"}
                  InputLabelProps={{ shrink: true }}
                  value={moment(form.startDate).format("YYYY-MM-DD")}
                  className={classes.textField}
                  onChange={(e) => handleChangeForm(e, "start")}
                />
                <div className={classes.textError}>{_.get(error, "dob", "")}</div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="End date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  disabled={show.mode === "upd"}
                  value={moment(form.endDate).format("YYYY-MM-DD")}
                  className={classes.textField}
                  onChange={(e) => handleChangeForm(e, "end")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Loop"
                  type="text"
                  variant="outlined"
                  select
                  disabled={show.mode === "upd"}
                  InputLabelProps={{ shrink: true }}
                  className={classes.textField}
                  value={form.loop}
                  onChange={(e) => handleChangeForm(e, "loop")}
                >
                  {Object.keys(CONSTANTS.LOOP_CALENDAR).map((option) => (
                    <MenuItem key={option} value={option}>
                      {_.get(CONSTANTS.LOOP_CALENDAR, `${option}`)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Offset reminder"
                  type="text"
                  variant="outlined"
                  select
                  InputLabelProps={{ shrink: true }}
                  className={classes.textField}
                  value={form.reminder}
                  onChange={(e) => handleChangeForm(e, "reminder")}
                >
                  {Object.keys(CONSTANTS.REMINDER).map((option) => (
                    <MenuItem key={option} value={option}>
                      {_.get(CONSTANTS.REMINDER, `${option}`)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <div className="btn-grp">
            <Button variant="contained" color="primary" onClick={handleCancel}>
              Cancel
            </Button>
            {show.mode === "upd" &&
              (<Button
                variant="contained"
                color="red"
                onClick={handleDelete}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </Button>)
            }
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSave}
              style={{ marginLeft: "10px" }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default Modal;
