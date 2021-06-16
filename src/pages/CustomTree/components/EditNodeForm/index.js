import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextareaAutosize,
  TextField,
  Grid,
  InputLabel,
  FilledInput,
  InputAdornment,
  FormControlLabel,
  Button,
  Checkbox,
  FormControl,
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import moment from "moment";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#905842",
    },
    secondary: {
      main: "#F2E1DA",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  padding: {
    padding: theme.spacing(1),
    textAlign: "right",
  },
  selectField: {
    width: "100%",
    padding: theme.spacing(1),
  },
  checkboxStyle: {
    width: "100%",
    marginLeft: theme.spacing(1),
    textAlign: "right",
  },
}));

function EditNodeForm(props) {
  const {
    // gender,
    formUpd,
    handleCancelEditForm,
    handleChangeFormUpdate,
    handleSaveFormUpdate,
  } = props;

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <div className="modal">
        <div className="grayout" onClick={handleCancelEditForm}></div>
        <div className="modal-form">
          <form noValidate autoComplete="off">
            <div className="label-section">Information</div>
            <Grid container>
              <Grid item xs={6} container>
                <FormControl className={classes.selectField} variant="filled">
                  <InputLabel
                    htmlFor="filled-adornment-amount"
                    className={classes.padding}
                  >
                    Name
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-amount"
                    value={formUpd.name}
                    onChange={(e) => handleChangeFormUpdate(e, "name")}
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} container>
                <FormControl className={classes.selectField} variant="filled">
                  <TextField
                    id="filled-select-calendar"
                    label="Birthday"
                    type="date"
                    value={moment(formUpd.dob).format("YYYY-MM-DD")}
                    onChange={(e) => handleChangeFormUpdate(e, "dob")}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={6} container alignItems="center">
                <FormControlLabel
                  className={classes.checkboxStyle}
                  variant="filled"
                  control={
                    <Checkbox
                      label="Is death: "
                      value={formUpd.isDeath}
                      onChange={(e) =>
                        handleChangeFormUpdate(e, "isDeath", !formUpd.isDeath)
                      }
                      inputProps={{ "aria-label": "Checkbox A" }}
                    />
                  }
                  label="Is death:"
                />
              </Grid>
              <Grid item xs={6} container>
                <FormControl className={classes.selectField} variant="filled">
                  <TextField
                    id="filled-select-calendar"
                    label="Death: "
                    type="date"
                    value={moment(formUpd.dod).format("YYYY-MM-DD")}
                    onChange={(e) => handleChangeFormUpdate(e, "dod")}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    disabled={!formUpd.isDeath}
                  ></TextField>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} container>
              <FormControl className={classes.selectField} variant="filled">
                <TextareaAutosize
                  label="Note"
                  aria-label="minimum height"
                  rowsMin={2}
                  placeholder="Notes"
                  value={formUpd.note}
                  onChange={(e) => handleChangeFormUpdate(e, "note")}
                />
              </FormControl>
            </Grid>
            <div className="btn-alert">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancelEditForm}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveFormUpdate}
                style={{ marginLeft: "10px" }}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default EditNodeForm;
