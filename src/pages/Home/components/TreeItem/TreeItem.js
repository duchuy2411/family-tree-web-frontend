import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import swal from "sweetalert";
import _ from "lodash";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { deleteTree, selectTrees, SET_CURRENT_TREE } from "../../homeSlice";

// MUI components
import {
  Avatar,
  Card,
  Grid,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
  List,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

// icons
import { MoreVert, WatchLater as WatchLaterIcon } from "@material-ui/icons";

import useTreeItemStyles from "./useTreeItemStyles";

export default function TreeItem({ id, logo, name, updatedAt, author, contributors }) {
  const classes = useTreeItemStyles();
  const dispatch = useDispatch();
  const trees = useSelector(selectTrees);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const history = useHistory();
  const options = ["Calendar", "Tree Management", "Delete Tree"];

  // const handleClickListItem = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    switch (index) {
    case 0: {
      const current = _.find(trees, (ele) => ele.id === id);
      dispatch(SET_CURRENT_TREE(current));
      history.push(`/calendar/${id}`);
      break;
    }
    case 1: {
      const current = _.find(trees, (ele) => ele.id === id);
      dispatch(SET_CURRENT_TREE(current));
      history.push(`/tree-management/${id}`);
      break;
    }
    case 2: {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this tree!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteTree(id));
        }
      });
      break;
    }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMoreMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Card className={classes.root}>
      <Grid container alignItems="center">
        {/* ava + info */}
        <Grid item lg={10} xs={11} container alignItems="center" className={classes.gridTree}>
          <img src={logo} alt="family avatar" className={classes.imgFamily} />

          {/* name - contributors - updatedAt */}
          <Grid
            item
            xs
            container
            justify="space-between"
            alignItems="center"
            className={classes.gridInfo}
          >
            {/* family name */}
            <Grid item xl={3} lg={3} md={5} sm={10}>
              <Typography className={classes.typoName}>
                <strong>{name}</strong>
              </Typography>
            </Grid>

            {/* avatar group */}
            <Grid
              item
              xl={4}
              lg={4}
              md
              // sm={10}
              sm={6}
              container
              alignItems="center"
              className={classes.gridAvatarGroup}
            >
              <Hidden mdDown>
                <Typography>Contributed by </Typography>
              </Hidden>
              <AvatarGroup max={4} className={classes.avatarGroup}>
                {author && (
                  <Tooltip title={`${author.username} - Owner`}>
                    <Avatar
                      alt={author.username}
                      src={author.avatarUrl}
                      className={classNames(classes.avatarBorder, classes.avatarOwner)}
                    />
                  </Tooltip>
                )}
                {/* Other contributors */}
                {contributors.map((contributor, index) => (
                  <Tooltip key={index} title={contributor.username}>
                    <Avatar alt={contributor.username} src={contributor.avatarUrl} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Grid>

            {/* updatedAt */}
            <Grid item xl={2} lg={3} md sm={6} className={classes.gridUpdatedAt}>
              <WatchLaterIcon className={classes.iconTime} />
              <Typography className={classes.typoUpdatedAt}>
                {moment(updatedAt).format("YYYY-MM-DD") || "No update"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* actions */}
        <Grid
          item
          xl={2}
          lg={2}
          md={1}
          sm={1}
          xs={1}
          container
          justify="flex-end"
          className={classes.gridActions}
        >
          <Hidden mdDown>
            <NavLink to={`/custom-tree/${id}`} className={classes.actionBtn}>
              Edit tree
            </NavLink>
            <List
              className={classes.actionBtn}
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              onClick={handleClickMoreMenu}
            >
              More Option
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menu}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  className={classes.menuItem}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Hidden>
          <Hidden lgUp>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>
      {/* end grid container */}
    </Card>
  );
}
