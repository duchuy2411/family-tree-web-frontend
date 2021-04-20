import React from "react";
import { Route, Switch } from "react-router";

// MUI
import { Grid, Hidden } from "@material-ui/core";

// components
import NavigationBar from "./components/NavigationBar/NavigationBar";

import useMainLayoutStyles from "./useMainStyles";
import pageRoutes from "../../pages/routes";

const privateRoutes = (
  <Switch>
    {pageRoutes.map((route, key) => {
      console.log(`${route.path} `);
      return (
        <Route path={route.path} exact={route.exact} key={key}>
          <route.component />
        </Route>
      );
    })}
  </Switch>
);

export default function Main() {
  const classes = useMainLayoutStyles();

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
          <Grid item xs={9} container direction="column" justify="center">
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
