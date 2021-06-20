import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import classNames from "classnames";

import { Input, Button, Grid } from "@material-ui/core";

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
    width: "100%",
    margin: "5px"
  },
  grayout: {
    position: "fixed",
    width: "100%",
    height: "100vh",
    opacity: "0.9",
    backgroundColor: "rgb(117, 117, 117)",
    zIndex: "200",
    top: "0",
    left: "0",
  },
  formContainer: {
    backgroundColor: "white",
    color: "#905842",
    width: "50%",
    height: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 3px rgb(204, 202, 202)",
    padding: "10px",
    transform: "translate(50%, 50%)",
    position: "fixed",
    zIndex: "201",
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#905842",
    marginBottom: theme.spacing(1),
    "&:hover": {
      color: "#fff",
    },
  },
  withSpace: {
    margin: theme.spacing(1, 0),
  },
  inputFields: {
    backgroundColor: "#F2E1DA",
    borderRadius: 24,
    height: theme.spacing(5),
    width: "100%",
    padding: theme.spacing(0, 2, 0, 2),
  },
}));

export default function Modal(props) {
  const {
    // show,
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
            <Input
              placeholder="Name"
              required
              fullWidth
              disableUnderline
              value={form.name}
              className={classNames(classes.withSpace, classes.inputFields)}
              onChange={(e) => handleChangeFormCreate(e, "name")}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              placeholder="Description"
              required
              fullWidth
              disableUnderline
              value={form.desctiption}
              className={classNames(classes.withSpace, classes.inputFields)}
              onChange={(e) => handleChangeFormCreate(e, "description")}
            />
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid style={{ margin: "10px 0px" }} item xs={4}>
            <Button variant="contained" color="primary" onClick={() => handleShow(false)}>
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
  );
}
