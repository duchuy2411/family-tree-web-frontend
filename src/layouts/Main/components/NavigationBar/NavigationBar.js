import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

// MUI
import { IconButton, Paper } from "@material-ui/core";

// Icons
import logo from "../../../../assets/svg/tree-shape-of-straight-lines.svg";
import { ReactComponent as LogoutIcon } from "../../../../assets/svg/log-out.svg";

import useNavigationBarStyles from "./useNavigationBarStyles";
import pageRoutes from "../../../../pages/routes";

const useStyles = useNavigationBarStyles;

export default function NavigationBar({ className }) {
  const classes = useStyles();

  const navBarClasses = classNames({
    [classes.navBar]: true,
    [className]: className !== undefined,
  });

  const navButtons = (
    <>
      {pageRoutes.map((route, key) =>
        route.onNavBar ? (
          <IconButton
            component={NavLink}
            to={route.path}
            exact={route.exact}
            key={key}
            className={classes.iconBtn}
            aria-label={route.description}
          >
            {route.icon}
          </IconButton>
        ) : null
      )}
    </>
  );

  return (
    <Paper className={navBarClasses} elevation={9}>
      <NavLink to="/" exact={true}>
        <img className={classes.imgLogo} src={logo} alt="logo branding" />
      </NavLink>

      {/* render Navigation buttons */}
      {navButtons}

      <div style={{ flexGrow: 1 }}></div>
      <IconButton
        component={NavLink}
        to="/logout"
        className={classes.iconBtn}
        aria-label="log out"
      >
        <LogoutIcon className={classes.iconLogout} />
      </IconButton>
    </Paper>
  );
}