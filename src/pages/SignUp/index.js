import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RRDLink, useHistory } from "react-router-dom";
import classNames from "classnames";

// MUI components
import { Button, Grid, Input, Paper, Typography, Hidden } from "@material-ui/core";

// logo
// import logo from "./../../assets/svg/tree-shape-of-straight-lines.svg";
import logo from "assets/img/tree.png";

import useSignupPageStyles from "./useSignupPageStyles";
import api from "../../utils/api";
import { authActions, selectIsLoading } from "../../store/authSlice";
import colors from "assets/colorPalette";
import LoadingInside from "components/LoadingInside";
import { Alert } from "@material-ui/lab";

export default function SignUpPage() {
  const classes = useSignupPageStyles();
  const usernameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const isLoading = useSelector(selectIsLoading);

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
      setIsLoading(true);
      const response = await api.signup(userToRegister);
      // eslint-disable-next-line no-unused-vars
      const { user, accessToken, refreshToken } = response.data.data;
      // eslint-disable-next-line no-unused-vars
      const { message, errors } = response.data;

      if (user) {
        history.push("/login");
        setError("");
      } else {
        // do something
      }
      dispatch(authActions.setIsLoading(false)); // disable loading
      setIsLoading(false);
    } catch (e) {
      console.log("Error in handleSignUp: ", e.response.data.message);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.wrapper}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {/* Left side container*/}
        <Hidden smDown>
          <Grid
            item
            xs={6}
            className={classes.leftSide}
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Paper elevation={10} className={classes.paperLeftSide}>
              <img src={logo} alt="logo" className={classes.logo} />
              <Typography className={classes.appTitle} variant="h3" component="h2">
                Origin Keeper
              </Typography>
            </Paper>
          </Grid>
        </Hidden>

        {/* Right side container */}
        <Grid
          item
          xs={10}
          sm={6}
          md={4}
          className={classes.rightSide}
          container
          alignItems="center"
          justify="center"
        >
          <Hidden mdUp>
            <Grid item xs={12} className={classes.gridItemPadding}>
              <Typography
                variant="h3"
                component="h2"
                style={{
                  color: colors.brown,
                }}
              >
                Origin Keeper
              </Typography>
            </Grid>
          </Hidden>

          <Grid item xs={12} className={classes.gridItemPadding} style={{ marginBottom: 24 }}>
            <Typography variant="h5" component="h2" className={classes.subText}>
              {"Let's create a new account!"}
            </Typography>
          </Grid>

          {error && <Alert severity="error">{error}</Alert>}

          {/* Username */}
          <Grid item xs={12} className={classes.gridItemPadding}>
            <Input
              inputRef={usernameRef}
              placeholder="Username"
              required
              fullWidth
              disableUnderline
              className={classNames(classes.withSpace, classes.inputFields)}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} className={classes.gridItemPadding}>
            <Input
              inputRef={emailRef}
              placeholder="Email"
              required
              fullWidth
              disableUnderline
              className={classNames(classes.withSpace, classes.inputFields)}
            />
          </Grid>

          {/* Password & confirm */}
          <Grid item xs={12} className={classes.gridItemPadding}>
            <Input
              inputRef={passwordRef}
              placeholder="Password"
              type="password"
              required
              fullWidth
              disableUnderline
              className={classNames(classes.withSpace, classes.inputFields, classes.passwordFields)}
            />
          </Grid>

          <Grid item xs={12} className={classes.gridItemPadding}>
            <Input
              inputRef={confirmPasswordRef}
              placeholder="Confirm password"
              type="password"
              required
              fullWidth
              disableUnderline
              className={classNames(classes.withSpace, classes.inputFields, classes.passwordFields)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            className={(classes.buttonArea, classes.gridItemPadding)}
            container
            direction="row"
            justify="space-around"
            alignItems="baseline"
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleSignUp}
              disabled={
                usernameRef?.current?.value === "" ||
                passwordRef?.current?.value === "" ||
                passwordRef?.current?.value !== confirmPasswordRef?.current?.value
              }
              className={classNames(classes.withSpace, classes.btnLogin)}
            >
              <LoadingInside isLoading={isLoading}>Sign Up</LoadingInside>
            </Button>
          </Grid>
          <div className={classes.link}>
            <RRDLink to="/login" className={classes.link}>
              I already have an account!
            </RRDLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
