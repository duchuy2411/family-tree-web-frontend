import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

// MUI
import {
  Avatar,
  Badge,
  ButtonBase,
  ClickAwayListener,
  Fade,
  Grid,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  Card,
  Hidden,
} from "@material-ui/core";

// icons
import { NotificationsActiveOutlined } from "@material-ui/icons";

// components
import SearchBox from "../../components/Search/Search";
import CustomToggleButton from "./components/ToggleButton/CustomToggleButtons";
import TreeItem from "./components/TreeItem/TreeItem";

// data sample
import data from "../../data";
import familyLogoSample from "../../assets/img/face/marc.jpg";
import UserAvatar from "../../assets/img/face/marc.jpg";

import useHomePageStyles from "./useHomePageStyles";

export default function HomePage() {
  const name = data.redux.name; // using redux instead
  const trees = data.familyTreeList; // call API here with sortOrder parameter
  const classes = useHomePageStyles();
  const [notificationCount, setNotificationCount] = useState(0); // using redux instead
  const [sortOrder, setSortOrder] = useState("all");

  const handleSortOrder = (event, newOrder) => {
    if (newOrder !== null) {
      console.log("Change sort order");
      setSortOrder(newOrder);
    }
  };

  //-- start User avatar
  const [userAvatarOpen, setUserAvatarOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    console.log("click user avatar");
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

  const familyTreeList = (
    <div>
      {trees.map((tree, index) => {
        return (
          <Fade
            key={index}
            in={true}
            style={{
              transitionDelay: true ? `${300 + index * 200}ms` : "0ms",
            }}
            {...(true ? { timeout: 500 } : {})}
          >
            <div>
              {/* Fade need a ref: solved by wrap element in a div */}
              <TreeItem
                logo={familyLogoSample}
                name={tree.familyName}
                updatedAt={tree.updatedAt}
                author={tree.author}
                contributors={tree.contributors}
              />
            </div>
          </Fade>
        );
      })}
    </div>
  );

  return (
    <>
      <div className={classes.wrapper}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <Grid container justify="space-between" className={classes.grid9}>
              <Grid
                item
                md={9}
                sm={9}
                xs
                container
                alignItems="center"
                className={classes.purple}
              >
                <SearchBox
                  className={classes.searchBox}
                  ariaLabel="Search for family"
                />
              </Grid>
              <Grid
                item
                md={3}
                sm={3}
                xs={4}
                container
                justify="flex-end"
                alignItems="center"
                className={classes.grid3}
              >
                <Grid item xs container justify="center">
                  <IconButton>
                    <Badge
                      invisible={notificationCount < 1}
                      color="secondary"
                      badgeContent={notificationCount}
                      showZero={true}
                      max={99}
                      overlap="circle"
                    >
                      <NotificationsActiveOutlined />
                    </Badge>
                  </IconButton>
                </Grid>
                <Grid item xs container justify="center">
                  {/* User avatar button */}
                  <ButtonBase
                    ref={anchorRef}
                    aria-controls={
                      userAvatarOpen ? "user-avatar-menu-grow" : undefined
                    }
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={classNames({
                      [classes.avatarBtn]: true,
                      [classes.avatarBtnActive]: userAvatarOpen,
                    })}
                  >
                    <Card raised>
                      <Avatar
                        alt="Ngo Bong Bap"
                        src={UserAvatar}
                        variant="rounded"
                      />
                    </Card>
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
                            <MenuItem
                              onClick={handleCloseUserAvatar}
                              component={NavLink}
                              to="/profile"
                            >
                              Profile
                            </MenuItem>
                            <MenuItem
                              onClick={handleCloseUserAvatar}
                              component={NavLink}
                              to="/logout"
                            >
                              Logout
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Popper>
                  </ButtonBase>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Top right panel  */}
          <Hidden smDown>
            <Grid item md={6}>
              <Paper className={classes.welcomePanel} elevation={9}>
                <div className={classes.welcomeText}>
                  <Typography
                    component="p"
                    className={classes.bigText}
                  >{`Hello ${name}`}</Typography>
                  <Typography variant="h6" component="p">
                    {"Let's create a new tree"}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
        <div className={classes.treeList}>
          <CustomToggleButton />
          {familyTreeList}
        </div>
      </div>
    </>
  );
}
