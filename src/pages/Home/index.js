import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import classNames from "classnames";
import { createTree, getTreeList } from '../Slice';
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
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

// icons
import { NotificationsActiveOutlined } from "@material-ui/icons";

// components
import SearchBox from "../../components/Search/Search";
import CustomToggleButton from "./components/ToggleButton/CustomToggleButtons";
import TreeItem from "./components/TreeItem/TreeItem";
import Modal from "./components/Modal";

// data sample
import familyLogoSample from "../../assets/img/face/marc.jpg";
import UserAvatar from "../../assets/img/face/marc.jpg";

import useHomePageStyles from "./useHomePageStyles";
import { selectUser } from "../../store/authSlice";
import api from "../../utils/api";

import { SET_TREES_ARRAY } from './homeSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const { firstName, midName, lastName } = useSelector(selectUser);
  const name = `${firstName ? firstName : ""} ${midName ? midName : ""} ${
    lastName ? lastName : ""
  }`;
  const classes = useHomePageStyles();
  // eslint-disable-next-line no-unused-vars
  const [notificationCount, setNotificationCount] = useState(0); // using redux instead
  // eslint-disable-next-line no-unused-vars
  const [sortOrder, setSortOrder] = useState("all");
  
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const handleSortOrder = (event, newOrder) => {
    if (newOrder !== null) {
      setSortOrder(newOrder);
    }
  };

  // trees
  const [trees, setTrees] = useState([]);

  const getTrees = useCallback(async () => {
    try {
      const response = await api.getTreeList();
      // eslint-disable-next-line no-unused-vars
      const { data, message, errors } = response.data;
      const trees = data;
      if (trees) {
        setTrees(trees);
        dispatch(SET_TREES_ARRAY(trees));
      }
    } catch (e) {
    }
  }, []);

  useEffect(() => {
    getTrees();
  }, [getTrees]);
  // end trees

  //-- start User avatar
  const [userAvatarOpen, setUserAvatarOpen] = React.useState(false);
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

  const familyTreeList = (
    <div>
      {trees.map((tree, index) => {
        return (
          <Fade
            key={tree.id}
            in={true}
            style={{
              transitionDelay: true ? `${300 + index * 200}ms` : "0ms",
            }}
            {...(true ? { timeout: 500 } : {})}
          >
            <div>
              {/* Fade need a ref: solved by wrap element in a div */}
              <TreeItem
                id={tree.id}
                logo={tree.owner.avatarUrl}
                name={tree.name}
                updatedAt={tree.lastModified}
                author={tree.owner}
                contributors={tree.editors}
              />
            </div>
          </Fade>
        );
      })}
    </div>
  );

  const handleShow = (isShow) => {
    setShow(isShow);
  }

  const handleChangeFormCreate = (e, label) => {
    switch(label) {
      case 'name' : {
        setForm({ ...form, name: e.target.value });
        break;
      }
      case 'description' : {
        setForm({ ...form, description: e.target.value });
        break;
      }
    }
  }

  const handleSave = async () => {
    const response = await dispatch(createTree(form));
    if (response.data) {
      alert(response.message);
      history.push(`/custom-tree/${response.data.id}`);
    }
  }

  return (
      <>
        { show &&
          (<Modal
            show={show}
            form={form}
            handleShow={handleShow}
            handleSave={handleSave}
            handleChangeFormCreate={handleChangeFormCreate}
          />)
        }
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
                  <Grid item md={5}></Grid>
                  <Grid item md={1} className={classes.btnNewTree}>
                    <Button className={classes.customBtnDashed} onClick={() => handleShow(true)}> + </Button>
                  </Grid>
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
