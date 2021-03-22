import { IconButton, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonIcon from "@material-ui/icons/Person";
import logo from "../../assets/svg/tree-shape-of-straight-lines.svg";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoutIcon } from "./../../assets/svg/log-out.svg";

const useStyles = makeStyles((theme) => ({
  root: {},
  navBar: {
    height: "96vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#905842",
    borderRadius: theme.spacing(3),
  },
  logo: {
    width: theme.spacing(5),
    margin: theme.spacing(4, 0),
  },
  iconBtn: {
    color: "#fff",
    margin: theme.spacing(2, 0),
  },
  logoutIcon: {
    width: "24px",
    height: "24px",
    fill: "#fff",
  },
  isActive: {
    backgroundColor: "red",
  },
}));
export default function NavigationBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.navBar} elevation={10}>
        <NavLink to="/" exact={true}>
          <img className={classes.logo} src={logo} alt="logo branding" />
        </NavLink>
        <NavLink to="/home">
          <IconButton className={classes.iconBtn} aria-label="go to home">
            <HomeIcon />
          </IconButton>
        </NavLink>
        <NavLink to="/calendar">
          <IconButton className={classes.iconBtn} aria-label="go to calendar">
            <DateRangeIcon />
          </IconButton>
        </NavLink>
        <NavLink to="/user">
          <IconButton className={classes.iconBtn} aria-label="go to user page">
            <PersonIcon />
          </IconButton>
        </NavLink>
        <div style={{ flexGrow: 1 }}></div>
        <NavLink to="/logout">
          <IconButton className={classes.iconBtn} aria-label="log out">
            <LogoutIcon className={classes.logoutIcon} />
          </IconButton>
        </NavLink>
      </Paper>
    </div>
  );
}
