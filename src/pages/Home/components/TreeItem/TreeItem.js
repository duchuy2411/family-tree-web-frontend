import React from "react";
import { NavLink } from "react-router-dom";

// MUI components
import { Avatar, Card, Grid, Tooltip, Typography } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

// icons
import WatchLaterIcon from "@material-ui/icons/WatchLater";

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
      <Grid container alignItems="center" justify="space-between">
        {/* xs={3} */}
        <Grid
          item
          xs={3}
          container
          alignItems="center"
          className={classes.gridAvaName}
        >
          <Grid item className={classes.gridImg}>
            <img src={logo} alt="family avatar" className={classes.imgFamily} />
          </Grid>
          <Grid item>
            <Typography
              className={classes.typoName}
              style={{ display: "flex" }}
            >
              <strong>{name}</strong>
            </Typography>
          </Grid>
        </Grid>

        {/* xs={2} */}
        <Grid item lg={2} className={classes.gridUpdatedAt}>
          <WatchLaterIcon className={classes.iconTime} />
          <Typography className={classes.typoUpdatedAt}>{updatedAt}</Typography>
        </Grid>

        {/* xs=2 */}
        <Grid item xs={2} className={classes.gridAuthor} container>
          <Typography>
            {"Created by "}
            <strong>{author}</strong>
          </Typography>
        </Grid>

        {/* xs=2 */}
        <Grid
          item
          xs={2}
          container
          alignItems="center"
          className={classes.gridAvatarGroup}
        >
          <Typography>Contributed by </Typography>
          <AvatarGroup max={4} className={classes.avatarGroup}>
            {contributors.map((contributor, index) => (
              <Tooltip key={index} title={contributor.name}>
                <Avatar alt={contributor.name} src={contributor.avatarUrl} />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Grid>

        {/* xs={3} */}
        <Grid
          item
          xs={3}
          container
          justify="flex-end"
          className={classes.gridActions}
        >
          <NavLink to="/trees/123/update" className={classes.actionBtn}>
            Edit tree
          </NavLink>
          <NavLink to="/trees/123/members" className={classes.actionBtn}>
            View members
          </NavLink>
        </Grid>
      </Grid>
    </Card>
  );
}
