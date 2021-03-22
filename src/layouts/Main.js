import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import pageRoutes from "./../pages/routes";
import { Route, Switch } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "grey",
    height: "100vh",
  },
  part: {
    backgroundColor: "cyan",
  },
  navBar: {
    // backgroundColor: "red",
  },
}));

const privateRoutes = (
  <Switch>
    {pageRoutes.map((route, key) => {
      return (
        <Route path={route.path} exact={route.exact} key={key}>
          <route.component />
        </Route>
      );
    })}
  </Switch>
);

export default function Main() {
  const classes = useStyles();

  return (
    // Level 0 (root container)
    <Grid container className={classes.container}>
      {/* Level 1 */}
      <Grid item xs={1} className={classes.part} container justify="center">
        {/* Level 2 */}
        <Grid item xs={9} container direction="column" justify="center">
          <NavigationBar className={classes.navBar} />
        </Grid>
      </Grid>
      <Grid item xs={11}>
        {privateRoutes}
      </Grid>
    </Grid>
  );
}
