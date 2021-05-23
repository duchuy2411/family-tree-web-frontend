import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import {
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  Button,
  Grid,
} from "@material-ui/core";

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
    customField: {
      width: '100%',
      margin: '5px'
    },
    grayout: {
      position: 'fixed',
      width: '100%',
      height: '100vh',
      opacity: '0.9',
      backgroundColor: 'rgb(117, 117, 117)',
      zIndex: '200',
      top: '0',
      left: '0',
    },
    formContainer: {
      backgroundColor: 'white',
      color: '#905842',
      width: '40%',
      height: 'auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px 3px rgb(204, 202, 202)',
      padding: '10px',
      transform: 'translate(50%, 50%)',
      position: 'fixed',
      zIndex: '201',
      textAlign: 'center',
    },
  })
)

export default function Modal(props) {
  const {
    show,
    form,
    handleShow,
    handleChangeFormCreate,
    handleSave,
  } = props;
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div className="modal">
        <div className={classes.grayout} onClick={() => handleShow(false)}></div>
        <Grid className={classes.formContainer} container justify="center" alignItems="center">
          <Grid item xs={12}>
            <FormControl className={classes.customField} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">
                Name
              </InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={form.name}
                onChange={(e) => handleChangeFormCreate(e, "name")}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.customField} variant="filled">
              <InputLabel
                htmlFor="filled-adornment-amount"
              >
                Description
              </InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={form.desctiption}
                onChange={(e) => handleChangeFormCreate(e, "description")}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Grid style={{ margin: '10px 0px' }}item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleShow(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSave}
              style={{ marginLeft: "10px" }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  )
}