import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, InputLabel, FilledInput, InputAdornment, MenuItem, Button, ButtonGroup } from '@material-ui/core';
import { createMuiTheme, useTheme, MuiThemeProvider } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#905842',
    },
    secondary: {
      main: '#F2E1DA',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  padding: {
    padding: theme.spacing(1),
    textAlign: 'right'
  },
  selectField: {
    width: '50%',
    padding: theme.spacing(1)
  },
}));

function ModalUpdate (props) {
  const {
    form,
    handleChange,
    handleChangeName,
    handleSave,
    handleCancel,
    nodeRelationship,
    relationship,
    handleChangeNodeRelationship,
    handleChangeRelationship,
    gender,
  } = props;
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div className="modal">
        <div className="grayout" onClick={handleCancel}></div>
        <div className="modal-form">
          <form noValidate autoComplete="off">
            <div className="label-section">Information</div>
            <FormControl className={classes.selectField} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount" className={classes.padding}>Name</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={form.name}
                onChange={handleChangeName}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
            </FormControl>
            <FormControl className={classes.selectField} variant="filled">
              <TextField
                id="filled-select-gender"
                select
                label="Select"
                value={form.gender}
                onChange={handleChange}
                helperText="Please select your gender"
                variant="filled"
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))} 
              </TextField>
            </FormControl>
            <FormControl className={classes.selectField} variant="filled">
              <TextField
                id="filled-select-calendar"
                label="Birthday"
                type="date"
                defaultValue="2021-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              >
              </TextField>
            </FormControl>
            <FormControl className={classes.selectField} variant="filled">
              <TextField
                id="filled-select-calendar"
                label="Birthday"
                type="date"
                defaultValue="2021-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              >
              </TextField>
            </FormControl>
            <div className="label-section"> Relationship </div>
            <FormControl className={classes.selectField} variant="filled">
              <TextField
                id="filled-select-noderelationship"
                select
                label="Select"
                value={form.isNew ? null : form.desNode}
                onChange={handleChangeNodeRelationship}
                helperText="Please select destination node"
                variant="filled"
                disabled={form.isNew}
              >
                {nodeRelationship().map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))} 
              </TextField>
            </FormControl>
            <FormControl className={classes.selectField} variant="filled">
              <TextField
                id="filled-select-relationship"
                select
                label="Select"
                value={form.isNew ? null : form.relationship}
                onChange={handleChangeRelationship}
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
            <div className="btn-alert">
              <Button variant="contained" color="primary" onClick={handleCancel} >Cancel</Button>
              <Button variant="contained" color="secondary" onClick={handleSave} style={{ marginLeft: '10px' }} >Save</Button>
            </div>
          </form>
        </div>    
      </div>
    </MuiThemeProvider>
  )
}

export default ModalUpdate;