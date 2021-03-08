import React from "react";
import classNames from "classnames";
// MUI components
import { Button, Grid, Input, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// logo
import logo from "./../../assets/svg/tree-shape-of-straight-lines.svg";
import { Link as RRDLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 15%",
    backgroundColor: "#F2E1DA",
  },
  wrapper: {
    padding: theme.spacing(5, 0),
    height: "100vh",
    // backgroundColor: "red",
  },
  leftSide: {
    // backgroundColor: "red",
  },
  paperLeftSide: {
    backgroundColor: "#905842",
    height: "600px",
    width: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  logo: {
    maxHeight: "300px",
  },
  appTitle: {
    color: "#fff",
    marginTop: theme.spacing(3),
  },
  rightSide: {
    // backgroundColor: "green",
  },
  withSpace: {
    margin: theme.spacing(1, 0),
  },
  inputFields: {
    backgroundColor: "white",
    borderRadius: 24,
    height: theme.spacing(5),
    maxWidth: "550px",
    padding: theme.spacing(0, 2, 0, 2),
  },
  btnLogin: {
    color: "#905842",
    backgroundColor: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
    marginBottom: theme.spacing(2),
    borderRadius: 24,
  },
  passwordFields: {
    maxWidth: "250px",
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
}));

export default function SignUpPage() {
  const classes = useStyles();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const handleLogin = () => {
    console.log(
      `Login button clicked\n
      Email: ${emailRef.current.value}\n
      Password: ${passwordRef.current.value}`
    );
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.wrapper}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {/* Left side container*/}
        <Grid
          item
          xs={5}
          className={classes.leftSide}
          container
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Paper elevation={10} className={classes.paperLeftSide}>
            <img src={logo} alt="logo" className={classes.logo} />
            <Typography
              className={classes.appTitle}
              variant="h3"
              component="h2"
            >
              Family tree
            </Typography>
          </Paper>
        </Grid>

        {/* Right side container */}
        <Grid
          item
          xs={5}
          className={classes.rightSide}
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          {/* Email */}
          <Input
            inputRef={emailRef}
            placeholder="Email"
            required
            fullWidth
            disableUnderline
            className={classNames(classes.withSpace, classes.inputFields)}
          />
          {/* Password & confirm */}
          <Grid
            item
            xs={12}
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            {/* Password */}
            <Input
              inputRef={passwordRef}
              placeholder="Password"
              type="password"
              required
              fullWidth
              disableUnderline
              className={classNames(
                classes.withSpace,
                classes.inputFields,
                classes.passwordFields
              )}
            />
            {/* Confirm password */}
            <Input
              inputRef={confirmPasswordRef}
              placeholder="Confirm password"
              type="password"
              required
              fullWidth
              disableUnderline
              className={classNames(
                classes.withSpace,
                classes.inputFields,
                classes.passwordFields
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.buttonArea}
            container
            direction="row"
            justify="space-around"
            alignItems="baseline"
          >
            <div className={classes.link}>
              <RRDLink to="/signup" className={classes.link}>
                Sign in
              </RRDLink>
            </div>
            <Button
              variant="contained"
              onClick={handleLogin}
              className={classNames(classes.withSpace, classes.btnLogin)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
