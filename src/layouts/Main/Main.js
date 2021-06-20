import React from "react";
import { Switch } from "react-router";

// import useMainLayoutStyles from "./useMainStyles";
import pageRoutes from "../../pages/routes";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MenuAppBar from "./components/AppBar";

const privateRoutes = (
  <Switch>
    {pageRoutes.map((route, key) => {
      return (
        <PrivateRoute path={route.path} exact={route.exact} key={key}>
          <route.component />
        </PrivateRoute>
      );
    })}
  </Switch>
);

export default function Main() {
  // const classes = useMainLayoutStyles();

  return (
  // Level 0 (root container)
  // <Grid container className={classes.root}>
  //   {/* Level 1 */}
  //   <Grid item md={1} xs={12} container justify="center">
  //     {/* Level 2 */}
  //     <Hidden mdUp>
  //       <div className={classes.red}>Horizontal navigation bar</div>
  //     </Hidden>
  //     <Hidden smDown>
  //       <Grid item xs={9}>
  //         <NavigationBar />
  //       </Grid>
  //     </Hidden>
  //   </Grid>
  //   <Grid item md={11} sm={12} xs={12}>
  //     {privateRoutes}
  //   </Grid>
  // </Grid>

    <>
      <MenuAppBar />
      {privateRoutes}
    </>
  );
}
