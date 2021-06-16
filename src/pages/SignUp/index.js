import React from "react";
import { useDispatch } from "react-redux";
import { Link as RRDLink, useHistory } from "react-router-dom";
import classNames from "classnames";

// MUI components
import { Button, Grid, Input, Paper, Typography } from "@material-ui/core";

// logo
import logo from "./../../assets/svg/tree-shape-of-straight-lines.svg";

import useSignupPageStyles from "./useSignupPageStyles";
import api from "../../utils/api";
import { authActions } from "../../store/authSlice";

export default function SignUpPage() {
  const classes = useSignupPageStyles();
  const usernameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const dispatch = useDispatch();

  //
  const history = useHistory();

  const handleSignUp = async () => {
    dispatch(authActions.setIsLoading(true)); // enable loading

    // validate

    const userToRegister = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      getRefreshToken: true,
    };

    try {
      const response = await api.signup(userToRegister);
      const { user, accessToken, refreshToken } = response.data.data;
      const { message, errors } = response.data;
      if (user) {
        history.push("/");
      } else {
        // do something
      }
      dispatch(authActions.setIsLoading(false)); // disable loading
    } catch (e) {
    }
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
          {/* Username */}
          <Input
            inputRef={usernameRef}
            placeholder="Username"
            required
            fullWidth
            disableUnderline
            className={classNames(classes.withSpace, classes.inputFields)}
          />
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
              <RRDLink to="/login" className={classes.link}>
                Sign in
              </RRDLink>
            </div>
            <Button
              variant="contained"
              onClick={handleSignUp}
              className={classNames(classes.withSpace, classes.btnLogin)}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
