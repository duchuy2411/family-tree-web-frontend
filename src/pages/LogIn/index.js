import React from "react";
import classNames from "classnames";

// MUI components
import { Button, Grid, Input, Paper, Typography } from "@material-ui/core";

// logo
import logo from "./../../assets/svg/tree-shape-of-straight-lines.svg";
import { Link as RRDLink } from "react-router-dom";

import useLoginPageStyles from "./useLoginPageStyles";

export default function LogInPage() {
  const classes = useLoginPageStyles();
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const handleLogin = () => {
    console.log(
      `Login button clicked\n
      Username: ${usernameRef.current.value}\n
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
          <Input
            inputRef={usernameRef}
            placeholder="Username"
            required
            fullWidth
            disableUnderline
            className={classNames(classes.withSpace, classes.inputFields)}
          ></Input>
          <Input
            inputRef={passwordRef}
            placeholder="Password"
            type="password"
            required
            fullWidth
            disableUnderline
            className={classNames(classes.withSpace, classes.inputFields)}
          ></Input>
          <Button
            variant="contained"
            onClick={handleLogin}
            className={classNames(classes.withSpace, classes.btnLogin)}
          >
            Login
          </Button>
          <div className={classes.link}>
            <RRDLink to="/signup" className={classes.link}>
              Create account
            </RRDLink>
            <RRDLink to="/forgot-password" className={classes.link}>
              Forgot password?
            </RRDLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
