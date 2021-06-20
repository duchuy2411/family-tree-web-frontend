import React, { useState } from "react";
import { Link as RRDLink, Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";

// MUI components
import {
  Button,
  Grid,
  Hidden,
  Input,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

// logo
import logo from "./../../assets/svg/tree-shape-of-straight-lines.svg";

import useLoginPageStyles from "./useLoginPageStyles";
import { authActions } from "./../../store/authSlice";
import api from "../../utils/api";
import LOCAL_STORAGE_KEYS from "../../configs/localStorageKeys";
import { SEVERITY_TYPES } from "configs/constants";
import { Alert } from "@material-ui/lab";
import LoadingInside from "components/LoadingInside";

const LogInPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //
  const classes = useLoginPageStyles();
  //
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  //
  const theme = useTheme();
  const smDownMatches = useMediaQuery(theme.breakpoints.down("sm"));

  // ux
  const [severity, setSeverity] = useState(SEVERITY_TYPES.INFO);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (redirectToReferrer === true) {
    if (location.state) {
      return <Redirect to={location.state.referrer} />;
    } else {
      return <Redirect to={"/"} />;
    }
  }

  const handleLogin = async () => {
    dispatch(authActions.setIsLoading(true)); // enable loading
    const loginData = {
      usernameOrEmail: usernameRef.current.value,
      password: passwordRef.current.value,
      getRefreshToken: true,
    };

    try {
      setIsLoading(true);
      const response = await api.login(loginData);
      const { user, accessToken, refreshToken } = response.data.data;
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      console.log("refresh token: ", refreshToken);
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

  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={11} md={10} lg={8} xl={6} container>
          <Paper
            elevation={10}
            className={classes.wrapper}
            style={{
              flexDirection: smDownMatches ? "column" : "row",
            }}
          >
            <Hidden smDown>
              <Grid
                item
                xs
                sm
                lg
                className={classes.leftSide}
                container
                alignItems="center"
                justify="center"
                direction="column"
              >
                <Hidden smDown>
                  <img src={logo} alt="logo" className={classes.logo} />
                </Hidden>
              </Grid>
            </Hidden>

            <Hidden mdUp>
              <Typography className={classes.appTitle} variant="h3" component="h2">
                Origin Keeper
              </Typography>
            </Hidden>

            <Grid
              item
              xs
              lg
              className={classNames({
                [classes.rightSide]: true,
                [classes.formAsRowBorder]: !smDownMatches,
                [classes.formAsColumnBorder]: smDownMatches,
              })}
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              {message && (
                <Alert severity={severity} className={classes.alert} style={{ marginBottom: 12 }}>
                  {message}
                </Alert>
              )}

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
              <LoadingInside isLoading={isLoading}>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  className={classNames(classes.withSpace, classes.btnLogin)}
                  disabled={
                    isLoading ||
                    usernameRef?.current?.value === "" ||
                    passwordRef?.current?.value === ""
                  }
                >
                  Login
                </Button>
              </LoadingInside>
              <div className={classes.link}>
                <RRDLink to="/signup" className={classes.link}>
                  Create account
                </RRDLink>
                <RRDLink to="/forgot-password" className={classes.link}>
                  Forgot password?
                </RRDLink>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

// export default withLoading(LogInPage);
export default LogInPage;
