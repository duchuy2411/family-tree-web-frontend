import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import _ from 'lodash';
import { Avatar, TextField, FormControl, InputLabel, FilledInput, InputAdornment, MenuItem, Button, Grid, FormControlLabel, Checkbox, TextareaAutosize } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import PhotoUpload from './PhotoUpload';
import CONSTANTS from '../../../../utils/const';
import './index.css';

var FormData = require("form-data");
var fs = require("fs")

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
    width: '100%',
    padding: theme.spacing(1),
    backgroundColor: '#FFFFFF',
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
  customButton: {
    textAlign: "center",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: '95%',
    color: 'black',
    boxShadow: '0 0 10px 3px gray',
    transition: 'transform 1s',
    backgroundColor: "#F2E1DA",
    "&:hover": {
      transform: 'scale(1.2)',
      backgroundColor: '#F2E1DA',
    }
  },
  textField50: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
}));

function ModalUpdate(props) {
  const {
    form,
    handleChangeAddForm,
    handleSave,
    handleUpdate,
    handleCancel,
    handleChangeImageUrl,
    nodeRelationship,
    gender,
    nodeSelect,
    handleSelectRelationship,
    showModal,
  } = props;

  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const classes = useStyles();

  const handleChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      const formData = new FormData();
      setImagePreviewUrl(reader.result);
      console.log("reader.result", reader.result);
      formData.append('file', reader.result);
      console.log(formData);
      
      handleChangeImageUrl(formData);
    }
    
    reader.readAsBinaryString(file);
  }

  const getLabel = () => {
    switch (showModal.select) { 
      case CHILDREN: {
        return `Spouse of ${nodeSelect.n}`;
      }
      case MOTHER: {
        return `Father`;
      }
      case FATHER: {
        return `Mother`;
      }
    } 
  }
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
              <Grid container justify="center">
                <Grid item xs={5} className={classes.textAlignCenter}>
                  <PhotoUpload
                    file={file}
                    imagePreviewUrl={imagePreviewUrl}
                    handleChangeImage={handleChangeImage}
                  />
                </Grid>
                <Grid item xs={7} spacing={1} container>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      type="text"
                      variant="outlined"
                      value={form.firstName}
                      onChange={(e) => handleChangeAddForm(e, 'firstName')}
                      className={classes.textField50}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      type="text"
                      variant="outlined"
                      value={form.lastName}
                      onChange={(e) => handleChangeAddForm(e, 'lastName')}
                      className={classes.textField50}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Gender"
                      type="text"
                      select
                      variant="outlined"
                      value={form.gender}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => handleChangeAddForm(e, 'gender')}
                      className={classes.textField50}
                    >
                      {gender.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))} 
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Day of birth"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      defaultValue="2021-01-01"
                      value={moment(form.dob).format("YYYY-MM-DD")}
                      onChange={(e) => handleChangeAddForm(e, 'dob')}
                      className={classes.textField50}
                    />
                  </Grid>
                  <Grid item xs={6}>
                      <FormControlLabel
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
                        label="Is dead:"
                      />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="date"
                      label="Day of dead"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      value={moment(form.dod).format("YYYY-MM-DD")}
                      onChange={(e) => handleChangeAddForm(e, 'dod')}
                      disabled={!form.isDeath}
                      className={classes.textField50}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    label="Note"
                    aria-label="minimum height"
                    rowsMin={4}
                    placeholder="Notes"
                    value={form.note}
                    onChange={(e) => handleChangeAddForm(e, 'note')}
                    className={classes.textField50}
                    style={{border: '1px solid #F2E1DA'}}
                  />
                </Grid>
              </Grid>
              <Grid spacing={1} container>
                <Grid item xs={5}>
                  <TextField
                    label="Phone"
                    type="text"
                    variant="outlined"
                    value={form.phone}
                    onChange={(e) => handleChangeAddForm(e, 'phone')}
                    className={classes.textField50}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    label="Occupation"
                    type="text"
                    variant="outlined"
                    value={form.occupation}
                    onChange={(e) => handleChangeAddForm(e, 'occupation')}
                    className={classes.textField50}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    type="text"
                    variant="outlined"
                    value={form.Address}
                    onChange={(e) => handleChangeAddForm(e, 'Address')}
                    className={classes.textField50}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                { showModal.select !== SPOUSE && showModal.mode === CONSTANTS.MODE_FORM.ADD &&
                  (
                    <Grid item xs={6}>
                      <TextField
                        type="text"
                        label={getLabel}
                        select
                        variant="outlined"
                        value={form.nodeRelationship || _.get(nodeRelationship(), '0.value')}
                        defaultValue={_.get(nodeRelationship(), '0.value')}
                        disabled={nodeRelationship().length === 0}
                        onChange={(e) => handleChangeAddForm(e, 'nodeRelationship')}
                        className={classes.textField50}
                      >
                        {nodeRelationship().map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))} 
                      </TextField>
                    </Grid>
                  )
                }
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
