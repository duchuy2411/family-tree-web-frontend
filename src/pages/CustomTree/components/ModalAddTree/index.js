import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import _ from "lodash";
import {
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  MenuItem,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  TextareaAutosize,
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import CONSTANTS from "../../../../utils/const";

const { SPOUSE, MOTHER, FATHER, CHILDREN } = CONSTANTS;

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
  avatarImg: {
    width: "13rem",
    height: "13rem",
    backgroundColor: "#FFFFFF",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  textArea: {
    padding: theme.spacing(1),
    width: "100%",
  },
  customField: {
    backgroundColor: "#F2E1DA",
    boxShadow: "0 0 10px 3px gray",
    borderRadius: "5px",
    transition: "transform 1s",
  },
  customButton: {
    textAlign: "center",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: "95%",
    backgroundColor: "#F2E1DA",
    color: "black",
    boxShadow: "0 0 10px 3px gray",
    transition: "transform 1s",
    "&:hover": {
      transform: "scale(1.2)",
      backgroundColor: "#F2E1DA",
    },
  },
}));

function ModalUpdate(props) {
  const {
    form,
    handleChangeAddForm,
    handleSave,
    handleUpdate,
    handleCancel,
    nodeRelationship,
    // relationship,
    gender,
    // stepForm,
    handleSelectRelationship,
    showModal,
  } = props;
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div className="modal">
        <div className="grayout" onClick={handleCancel}></div>
        {showModal.step === 1 && (
          <div className="modal-form step1">
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12}>
                <Button
                  disabled={!showModal.rel.includes(CHILDREN)}
                  onClick={() => handleSelectRelationship(CONSTANTS.CHILDREN)}
                  className={classes.customButton}
                >
                  Add children
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!showModal.rel.includes(SPOUSE)}
                  onClick={() => handleSelectRelationship(CONSTANTS.SPOUSE)}
                  className={classes.customButton}
                >
                  Add spouse
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!showModal.rel.includes(MOTHER)}
                  onClick={() => handleSelectRelationship(CONSTANTS.MOTHER)}
                  className={classes.customButton}
                >
                  Add mother
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!showModal.rel.includes(FATHER)}
                  onClick={() => handleSelectRelationship(CONSTANTS.FATHER)}
                  className={classes.customButton}
                >
                  Add father
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
        {showModal.step === 2 && (
          <div className="modal-form step2">
            <form noValidate autoComplete="off">
              <Grid container justify="centers" alignItems="center">
                <Grid item xs={5} className={classes.textAlignCenter}>
                  <FormControl>
                    <Avatar
                      alt="Remy Sharp"
                      src="../../../../assets/img/face/marc.jpg"
                      className={classes.avatarImg}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={7} container>
                  <Grid item xs={6}>
                    <FormControl
                      className={classes.selectField}
                      variant="filled"
                    >
                      <InputLabel
                        htmlFor="filled-adornment-amount"
                        className={classes.padding}
                      >
                        Firtst name
                      </InputLabel>
                      <FilledInput
                        className={classes.customField}
                        id="filled-adornment-amount"
                        value={form.firstName}
                        onChange={(e) => handleChangeAddForm(e, "firstName")}
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      className={classes.selectField}
                      variant="filled"
                    >
                      <InputLabel
                        htmlFor="filled-adornment-amount"
                        className={classes.padding}
                      >
                        Last name
                      </InputLabel>
                      <FilledInput
                        className={classes.customField}
                        id="filled-adornment-amount"
                        value={form.lastName}
                        onChange={(e) => handleChangeAddForm(e, "lastName")}
                        startAdornment={
                          <InputAdornment position="start"></InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      className={classes.selectField}
                      variant="filled"
                    >
                      <TextField
                        id="filled-select-gender"
                        select
                        className={classes.customField}
                        label="Gender"
                        value={form.gender}
                        onChange={(e) => handleChangeAddForm(e, "gender")}
                        variant="filled"
                      >
                        {gender.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      className={classes.selectField}
                      variant="filled"
                    >
                      <TextField
                        className={classes.customField}
                        label="Birthday"
                        type="date"
                        defaultValue="2021-05-24"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        value={moment(form.dob).format("YYYY-MM-DD")}
                        onChange={(e) => handleChangeAddForm(e, "dob")}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      className={classes.selectField}
                      variant="filled"
                    >
                      <FormControlLabel
                        className={classes.customField}
                        variant="filled"
                        style={{
                          width: "100%",
                          marginLeft: "0.2rem",
                          height: "3.5rem",
                          textAlign: "center",
                        }}
                        control={
                          <Checkbox
                            label="Is dead"
                            value={form.isDeath}
                            style={{ color: "black" }}
                            onChange={(e) =>
                              handleChangeAddForm(e, "isDeath", !form.isDeath)
                            }
                            inputProps={{ "aria-label": "Checkbox A" }}
                          />
                        }
                        label="Is death:"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      className={classes.selectField}
                      variant="filled"
                    >
                      <TextField
                        id="filled-select-calendar"
                        className={classes.customField}
                        label="Death"
                        type="date"
                        defaultValue="2021-05-24"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="filled"
                        onChange={(e) => handleChangeAddForm(e, "dod")}
                        value={moment(form.dod).format("YYYY-MM-DD")}
                        disabled={!form.isDeath}
                      ></TextField>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.textArea}>
                    <TextareaAutosize
                      label="Note"
                      aria-label="minimum height"
                      className={classes.customField}
                      rowsMin={4}
                      placeholder="Notes"
                      value={form.note}
                      onChange={(e) => handleChangeAddForm(e, "note")}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5}>
                  <FormControl className={classes.selectField} variant="filled">
                    <InputLabel
                      htmlFor="filled-adornment-amount"
                      className={classes.padding}
                    >
                      Phone
                    </InputLabel>
                    <FilledInput
                      className={classes.customField}
                      id="filled-adornment-amount"
                      value={form.phone}
                      onChange={(e) => handleChangeAddForm(e, "phone")}
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={7}>
                  <FormControl className={classes.selectField} variant="filled">
                    <InputLabel
                      htmlFor="filled-adornment-amount"
                      className={classes.padding}
                    >
                      Occupation
                    </InputLabel>
                    <FilledInput
                      className={classes.customField}
                      id="filled-adornment-amount"
                      value={form.occupation}
                      onChange={(e) => handleChangeAddForm(e, "occupation")}
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.selectField} variant="filled">
                    <InputLabel
                      htmlFor="filled-adornment-amount"
                      className={classes.padding}
                    >
                      Home Address
                    </InputLabel>
                    <FilledInput
                      className={classes.customField}
                      id="filled-adornment-amount"
                      value={form.address}
                      onChange={(e) => handleChangeAddForm(e, "address")}
                      startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <FormControl className={classes.selectField} variant="filled">
                    <TextField
                      id="filled-select-noderelationship"
                      select
                      label="Select"
                      value={
                        form.nodeRelationship ||
                        _.get(nodeRelationship(), "0.value")
                      }
                      onChange={(e) =>
                        handleChangeAddForm(e, "nodeRelationship")
                      }
                      helperText="Please select destination node"
                      variant="filled"
                      defaultValue={_.get(nodeRelationship(), "0.value")}
                      disabled={nodeRelationship().length === 0}
                    >
                      {nodeRelationship().map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={6}>
                  <FormControl className={classes.selectField} variant="filled">
                    <TextField
                      id="filled-select-relationship"
                      select
                      label="Select"
                      value={form.isNew ? null : form.relationship}
                      onChange={(e) => handleChangeAddForm(e, 'relationship')}
                      helperText="Please select your relationship"
                      variant="filled"
                      disabled={form.isNew}
                    >
                      {relationship.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))} 
                    </TextField>
                  </FormControl>
                </Grid> */}
              </Grid>
              <div className="btn-alert">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                {showModal.mode === CONSTANTS.MODE_FORM.ADD ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                    style={{ marginLeft: "10px" }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleUpdate}
                    style={{ marginLeft: "10px" }}
                  >
                    Save
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </MuiThemeProvider>
  );
}

export default ModalUpdate;
