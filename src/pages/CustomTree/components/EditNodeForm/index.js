import React from 'react';
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

function EditNodeForm (props) {
  const {
    gender,
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
            <FormControl className={classes.selectField} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount" className={classes.padding}>Name</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={formUpd.name}
                onChange={(e) => handleChangeFormUpdate(e, 'name')}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
              />
            </FormControl>
            <FormControl className={classes.selectField} variant="filled">
              <TextField
                id="filled-select-gender"
                select
                label="Select"
                value={formUpd.gender}
                onChange={() => handleChangeFormUpdate('gender')}
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
                value={formUpd.dob}
                onChange={(e) => handleChangeFormUpdate(e, 'dob')}
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
                value={formUpd.dod}
                onChange={(e) => handleChangeFormUpdate(e, 'dod')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              >
              </TextField>
            </FormControl>
            <div className="label-section"> aaaa </div>
            <FormControl className={classes.selectField} variant="filled">
              <TextField
                id="filled-select-noderelationship"
                select
                label="Select"
                value={formUpd}
                onChange={(e) => handleChangeFormUpdate(e)}
                helperText="Please select destination node"
                variant="filled"
                disabled={formUpd.isNew}
              >
                {/* {nodeRelationship().map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}  */}
              </TextField>
            </FormControl>
            <div className="btn-alert">
              <Button variant="contained" color="primary" onClick={handleCancelEditForm} >Cancel</Button>
              <Button variant="contained" color="secondary" onClick={handleSaveFormUpdate} style={{ marginLeft: '10px' }} >Save</Button>
            </div>
          </form>
        </div>    
      </div>
    </MuiThemeProvider>
  )
}

export default EditNodeForm;