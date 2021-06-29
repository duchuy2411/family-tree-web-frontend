import React from "react";
import { useDispatch } from "react-redux";
import { Link as RRDLink, useHistory } from "react-router-dom";
import classNames from "classnames";

// MUI components
import { Button, Grid, Input, Paper, Typography, Hidden } from "@material-ui/core";

// logo
// import logo from "./../../assets/svg/tree-shape-of-straight-lines.svg";
import logo from "assets/img/logo.png";

import useSignupPageStyles from "./useSignupPageStyles";
import api from "../../utils/api";
import { authActions } from "../../store/authSlice";
import colors from "assets/colorPalette";

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
      // eslint-disable-next-line no-unused-vars
      const { user, accessToken, refreshToken } = response.data.data;
      // eslint-disable-next-line no-unused-vars
      const { message, errors } = response.data;
      if (user) {
        history.push("/");
      } else {
        // do something
      }
      dispatch(authActions.setIsLoading(false)); // disable loading
    } catch (e) {
      //console.log("Error in handleSignUp: ", e);
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
        // style={{ backgroundColor: "violet" }}
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
            // style={{ backgroundColor: "green" }}
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
          xs={12}
          md={6}
          className={classes.rightSide}
          container
          alignItems="center"
          justify="center"
          // style={{ backgroundColor: "blue" }}
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
          <Grid item xs={12} md={6} className={classes.gridItemPadding}>
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

          <Grid
            item
            xs={12}
            md={6}
            className={classes.gridItemPadding}
            // style={{ backgroundColor: "green" }}
          >
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
            className={classes.buttonArea}
            container
            direction="row"
            justify="space-around"
            alignItems="baseline"
          >
            <div className={classes.link}>
              <RRDLink to="/login" className={classes.link}>
                I already have an account!
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
