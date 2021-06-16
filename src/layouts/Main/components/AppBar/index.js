import React, { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Avatar,
  Badge,
  Button,
  ButtonBase,
  ClickAwayListener,
  MenuList,
  Paper,
  Popover,
  Popper,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../../../store/authSlice";

import { NavLink } from "react-router-dom";

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  HomeOutlined as HomeOutlinedIcon,
  DateRange as DateRangeIcon,
  DateRangeOutlined as DateRangeOutlinedIcon,
} from "@material-ui/icons";

import NotificationsList from "../NotificationsList";

import classNames from "classnames";

import { getAllNotifications, markAnNotificationAsRead, selectNotifications } from "./slice";

import useAppBarStyles from "./styles";

const PATHS = {
  HOME: "/",
  CALENDAR: "/calendar",
};

const MenuAppBar = () => {
  const pathname = window.location.pathname;

  const classes = useAppBarStyles();

  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const notifications = useSelector(selectNotifications);

  // -- start notifications
  const [notiAnchorEl, setNotiAnchorEl] = useState(null);

  const handleClickNotifications = (event) => {
    setNotiAnchorEl(event.target);
  };

  const handleCloseNotifications = () => {
    setNotiAnchorEl(null);
  };

  const openNoti = Boolean(notiAnchorEl);
  const idNotiPopover = openNoti ? "notification-popover" : undefined;

  const handleTriggerRead = (idNotification) => (event) => {
    event.preventDefault();

    console.log("trigger already read", idNotification);
    dispatch(markAnNotificationAsRead(idNotification));
  };

  // get all notifications on mount
  useEffect(() => {
    // dispatch(getAllNotifications()); // TODO: uncomment this line when attach API for Calendar
  }, [dispatch]);

  // -- end notifications

  //-- start User avatar
  const [userAvatarOpen, setUserAvatarOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setUserAvatarOpen((prevOpen) => !prevOpen);
  };

  const handleCloseUserAvatar = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setUserAvatarOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setUserAvatarOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(userAvatarOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && userAvatarOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = userAvatarOpen;
  }, [userAvatarOpen]);
  //-- end user avatar

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.leftArea}>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="textPrimary"
              component={NavLink}
              to={PATHS.HOME}
              className={classes.title}
            >
              Origin Keeper
            </Typography>
          </div>

          <div className={classes.centerArea}>
            <Button
              className={classNames({
                [classes.navButton]: true,
                [classes.navButtonHighlight]: pathname === PATHS.HOME,
              })}
              component={NavLink}
              to={PATHS.HOME}
              exact
            >
              {pathname === PATHS.HOME ? (
                <HomeIcon className={classes.navIconHighlight} />
              ) : (
                <HomeOutlinedIcon />
              )}
            </Button>
            <Button
              className={classNames({
                [classes.navButton]: true,
                [classes.navButtonHighlight]: pathname === PATHS.CALENDAR,
              })}
              component={NavLink}
              to={PATHS.CALENDAR}
              exact
            >
              {pathname === PATHS.CALENDAR ? (
                <DateRangeIcon className={classes.navIconHighlight} />
              ) : (
                <DateRangeOutlinedIcon />
              )}
            </Button>
          </div>

          {/* right area */}
          {currentUser && (
            <div>
              <Badge
                component={IconButton}
                className={classNames({
                  [classes.notificationsButton]: true,
                  [classes.notificationsButtonHighlight]: notiAnchorEl !== null,
                })}
                onClick={handleClickNotifications}
                invisible={notifications?.length < 1}
                color="secondary"
                badgeContent={notifications?.length}
                max={99}
                overlap="circle"
              >
                <NotificationsIcon />
              </Badge>

              <Popover
                id={idNotiPopover}
                open={openNoti}
                anchorEl={notiAnchorEl}
                onClose={handleCloseNotifications}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <NotificationsList
                  notifications={notifications}
                  handleTriggerRead={handleTriggerRead}
                />
              </Popover>

              {/* User avatar button */}
              <ButtonBase
                ref={anchorRef}
                aria-controls={userAvatarOpen ? "user-avatar-menu-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classNames({
                  [classes.avatarBtn]: true,
                  [classes.avatarBtnActive]: userAvatarOpen,
                })}
              >
                <Avatar alt="user name" src={currentUser?.avatarUrl} />
                <Popper
                  open={userAvatarOpen}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  placement="bottom-end"
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseUserAvatar}>
                      <MenuList
                        autoFocusItem={userAvatarOpen}
                        id="user-avatar-menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleCloseUserAvatar} component={NavLink} to="/user">
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserAvatar} component={NavLink} to="/logout">
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Popper>
              </ButtonBase>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolBarOffset}></div>
    </div>
  );
};

export default MenuAppBar;
