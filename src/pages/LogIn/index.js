import React, { useState } from "react";
import { Link as RRDLink, Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";

// MUI components
import { Button, Grid, Hidden, Input, Paper, Typography, Divider } from "@material-ui/core";

// logo
import logo from "assets/img/tree.png";

import useLoginPageStyles from "./useLoginPageStyles";
import { authActions } from "./../../store/authSlice";
import api from "../../utils/api";
import LOCAL_STORAGE_KEYS from "../../configs/localStorageKeys";
import { SEVERITY_TYPES } from "configs/constants";
import { Alert } from "@material-ui/lab";
import LoadingInside from "components/LoadingInside";
import colors from "assets/colorPalette";

const LogInPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //
  const classes = useLoginPageStyles();
  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  // ux
  const [severity, setSeverity] = useState(SEVERITY_TYPES.INFO);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    dispatch(authActions.setIsLoading(true)); // enable loading
    const loginData = {
      usernameOrEmail: username,
      password: password,
      getRefreshToken: true,
    };

    try {
      setIsLoading(true);
      const response = await api.login(loginData);
      const { user, accessToken, refreshToken } = response.data.data;
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

      dispatch(authActions.login(user));
      setRedirectToReferrer(true);

      setSeverity(SEVERITY_TYPES.INFO);
      setMessage("");
      dispatch(authActions.setIsLoading(false)); // disable loading
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setSeverity(SEVERITY_TYPES.ERROR);
        setMessage(error.response.data.message);
        setIsLoading(false);
      }
    }
  };

  if (redirectToReferrer === true) {
    if (location.state) {
      return <Redirect to={location.state.referrer} />;
    } else {
      return <Redirect to={"/"} />;
    }
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" className={classes.wrapper}>
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
                  color: colors.blue2,
                }}
              >
                Origin Keeper
              </Typography>
            </Grid>
          </Hidden>

          <Grid item xs={12} className={classes.gridItemPadding} style={{ marginBottom: 24 }}>
            <Typography
              variant="h5"
              component="h2"
              style={{ color: colors.blue2, marginBottom: 8 }}
            >
              Welcome back!
            </Typography>
          </Grid>

          {message && (
            <Alert severity={severity} className={classes.alert} style={{ marginBottom: 12 }}>
              {message}
            </Alert>
          )}

          {/* Username */}
          <Grid
            item
            xs={12}
            className={classes.gridItemPadding}
            // style={{ backgroundColor: "violet" }}
          >
            <Input
              inputRef={usernameRef}
              value={username}
              onChange={handleChangeUsername}
              placeholder="Username"
              required
              fullWidth
              disableUnderline
              className={classNames(classes.withSpace, classes.inputFields)}
            />
          </Grid>

          <Grid item xs={12} className={classes.gridItemPadding}>
            <Input
              inputRef={passwordRef}
              value={password}
              onChange={handleChangePassword}
              placeholder="Password"
              type="password"
              required
              fullWidth
              disableUnderline
              className={classNames(classes.withSpace, classes.inputFields)}
            />
          </Grid>

          <Grid item xs={12} container justify="center" className={classes.gridItemPadding}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              className={classNames(classes.withSpace, classes.btnLogin)}
              disabled={isLoading || username === "" || password === ""}
            >
              <LoadingInside isLoading={isLoading}>Login</LoadingInside>
            </Button>
          </Grid>
          <div className={classes.link}>
            <RRDLink to="/signup" className={classes.link}>
              Create account
            </RRDLink>

            <Divider />

            <RRDLink to="/forgot-password" className={classes.link}>
              Forgot password?
            </RRDLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LogInPage;
