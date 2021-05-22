import React, { useCallback, useEffect } from "react";
import { Switch } from "react-router";

// MUI
import { Grid, Hidden } from "@material-ui/core";

// components
import NavigationBar from "./components/NavigationBar/NavigationBar";

import useMainLayoutStyles from "./useMainStyles";
import pageRoutes from "../../pages/routes";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const privateRoutes = (
  <Switch>
    {pageRoutes.map((route, key) => {
      console.log(`${route.path} `);
      return (
        <PrivateRoute path={route.path} exact={route.exact} key={key}>
          <route.component />
        </PrivateRoute>
      );
    })}
  </Switch>
);

export default function Main() {
  const classes = useMainLayoutStyles();
  // const dispatch = useDispatch();

  // const getUserFromLocalStorage = useCallback(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   console.log("getUserFromLocalStorage - user: ", user);

  //   dispatch(authActions.setUser(user));
  // }, [dispatch]);

  // // get user on mount
  // useEffect(() => {
  //   getUserFromLocalStorage();
  // }, [getUserFromLocalStorage]);

  return (
    // Level 0 (root container)
    <Grid container className={classes.root}>
      {/* Level 1 */}
      <Grid item md={1} xs={12} container justify="center">
        {/* Level 2 */}
        <Hidden mdUp>
          <div className={classes.red}>Horizontal navigation bar</div>
        </Hidden>
        <Hidden smDown>
          <Grid item xs={9}>
            <NavigationBar />
          </Grid>
        </Hidden>
      </Grid>
      <Grid item md={11} sm={12} xs={12}>
        {privateRoutes}
      </Grid>
    </Grid>
  );
}
