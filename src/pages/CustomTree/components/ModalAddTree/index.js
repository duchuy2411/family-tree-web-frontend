import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Avatar, TextField, FormControl, InputLabel, FilledInput, InputAdornment, MenuItem, Button, Grid, FormControlLabel, Checkbox, TextareaAutosize } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
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
    width: '100%',
    padding: theme.spacing(1)
  },
  avatarImg: {
    width: "11rem",
    height: "11rem",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  textArea: {
    padding: theme.spacing(1),
    width: '100%',
  },
}));

function ModalUpdate (props) {
  const {
    form,
    handleChangeAddForm,
    handleSave,
    handleCancel,
    nodeRelationship,
    relationship,
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
            <Grid container justify="centers" alignItems="center">
              <Grid item xs={4} className={classes.textAlignCenter}>
                <FormControl>
                  <Avatar alt="Remy Sharp" src="../../../../assets/img/face/marc.jpg" className={classes.avatarImg}/>
                </FormControl>
              </Grid>
              <Grid item xs={8} container>
                <Grid item xs={12}>
                  <FormControl className={classes.selectField} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount" className={classes.padding}>Name</InputLabel>
                    <FilledInput
                      id="filled-adornment-amount"
                      value={form.name}
                      onChange={(e) => handleChangeAddForm(e, 'name')}
                      startAdornment={<InputAdornment position="start"></InputAdornment>}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.selectField} variant="filled">
                    <TextField
                      id="filled-select-gender"
                      select
                      label="Gender"
                      value={form.gender}
                      onChange={(e) => handleChangeAddForm(e, 'gender')}
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
                      value={moment(form.dob).format("YYYY-MM-DD")}
                      onChange={(e) => handleChangeAddForm(e, 'dob')}
                    >
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={6} container>
                  <FormControl className={classes.selectField} variant="filled">
                    <FormControlLabel
                      className={classes.checkboxStyle}
                      variant="filled"
                      control={
                        <Checkbox
                          label="Is death: "
                          value={form.isDeath}
                          onChange={(e) => handleChangeAddForm(e, 'isDeath', !form.isDeath)}
                          inputProps={{ 'aria-label': 'Checkbox A' }}
                        />
                      }
                      label="Is death:"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.selectField} variant="filled">
                    <TextField
                      id="filled-select-calendar"
                      label="Death"
                      type="date"
                      defaultValue="2021-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      onChange={(e) => handleChangeAddForm(e, 'dod')}
                      value={moment(form.dod).format("YYYY-MM-DD")}
                      disabled={!form.isDeath}
                    >
                    </TextField>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.textArea}>
                  <TextareaAutosize
                    label="Note"
                    aria-label="minimum height"
                    rowsMin={2}
                    placeholder="Notes"
                    value={form.note}
                    onChange={(e) => handleChangeAddForm(e, 'note')}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <div className="label-section"> Relationship </div>
            <Grid container>
              <Grid item xs={6}>
                <FormControl className={classes.selectField} variant="filled">
                  <TextField
                    id="filled-select-noderelationship"
                    select
                    label="Select"
                    value={form.isNew ? null : form.desNode}
                    onChange={(e) => handleChangeAddForm(e, 'nodeRelationship')}
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
            </Grid>            
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