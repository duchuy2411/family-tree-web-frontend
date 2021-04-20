import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

// MUI components
import {
  Avatar,
  Card,
  Grid,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

// icons
import { MoreVert, WatchLater as WatchLaterIcon } from "@material-ui/icons";

import useTreeItemStyles from "./useTreeItemStyles";

export default function TreeItem({
  logo,
  name,
  updatedAt,
  author,
  contributors,
}) {
  const classes = useTreeItemStyles();

  return (
    <Card className={classes.root}>
      <Grid container alignItems="center">
        {/* ava + info */}
        <Grid
          item
          lg={10}
          xs={11}
          container
          alignItems="center"
          className={classes.gridTree}
        >
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
                {/* Owner - the first in contributors list*/}
                <Tooltip key={0} title={`${contributors[0].name} - Owner`}>
                  <Avatar
                    alt={contributors[0].name}
                    src={contributors[0].avatarUrl}
                    className={classNames(
                      classes.avatarBorder,
                      classes.avatarOwner
                    )}
                  />
                </Tooltip>
                {/* Other contributors */}
                {contributors.slice(1).map((contributor, index) => (
                  <Tooltip key={index} title={contributor.name}>
                    <Avatar
                      alt={contributor.name}
                      src={contributor.avatarUrl}
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Grid>

            {/* updatedAt */}
            <Grid
              item
              xl={2}
              lg={3}
              md
              sm={6}
              className={classes.gridUpdatedAt}
            >
              <WatchLaterIcon className={classes.iconTime} />
              <Typography className={classes.typoUpdatedAt}>
                {updatedAt}
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
            <NavLink to="/custom-tree" className={classes.actionBtn}>
              Edit tree
            </NavLink>
            <NavLink to="/trees/123/members" className={classes.actionBtn}>
              View members
            </NavLink>
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
