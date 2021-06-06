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

    const response = await api.login(loginData);
    const { user, accessToken, refreshToken } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    console.log("refresh token: ", refreshToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (user) {
      dispatch(authActions.login(user));
      setRedirectToReferrer(true);
    } else {
      // do something
    }
    dispatch(authActions.setIsLoading(false)); // disable loading
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
              <Typography
                className={classes.appTitle}
                variant="h3"
                component="h2"
              >
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
              {/* <div className={classes.rightWrapper}> */}
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
              {/* </div> */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

// export default withLoading(LogInPage);
export default LogInPage;
