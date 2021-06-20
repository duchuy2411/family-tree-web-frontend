import React from "react";

import {
  List,
  ListItem,
  ListItemText,
  ButtonBase,
  Typography,
  IconButton,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core";
import { Delete, Lens } from "@material-ui/icons";
import classNames from "classnames";
import colors from "../../../../assets/colorPalette";
import { convertTimeToPeriod } from "utils/notifications";

const useStyles = makeStyles(() => ({
  list: {
    width: "40ch",
    padding: 12,
  },

  listItem: {
    position: "relative",
    padding: 8,
    borderRadius: 8,
    transition: "background-color 0.5s ease",
    "&:hover": {
      backgroundColor: colors.pink,
      "& $markAsReadButtonVisibility": {
        visibility: "visible",
      },
    },
  },
  hidden: {
    visibility: "hidden",
  },
  markAsReadButton: {
    position: "absolute",
    right: "2ch",
  },
  markAsReadButtonVisibility: {
    visibility: "hidden",
  },
  margin12: {
    margin: 12,
  },
  iconUnread: {
    fontSize: "small",
    color: colors.brown,
  },
  highlighted: {
    color: colors.brown,
    fontWeight: "bold",
  },
}));

export default function NotificationsList(props) {
  const {
    // isLoading,
    notifications,
    handleTriggerRead,
    handleDeleteNotification,
  } = props;

  const classes = useStyles();

  return (
    <>
      <List className={classes.list}>
        {/* {isLoading &&
          Array.from(new Array(1)).map((item, index) => (
            <div key={index} className={classes.listItem}>
              <Skeleton />
              <Skeleton />
              <Skeleton width="40%" />
            </div>
          ))} */}

        {notifications?.length === 0 ? (
          <div className={classes.margin12}>{"You don't have any notifications"}</div>
        ) : (
          notifications.map((notification) => (
            <ListItem
              key={notification.id}
              component={ButtonBase}
              onClick={handleTriggerRead(notification.id)}
              className={classes.listItem}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    color={notification.isRead ? "textSecondary" : "textPrimary"}
                  >
                    {notification.message || "Message Message Message Message"}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant={notification.isRead ? "caption" : "body2"}
                    color={notification.isRead ? "textSecondary" : "primary"}
                    className={classNames({
                      [classes.highlighted]: !notification.isRead,
                    })}
                  >
                    {convertTimeToPeriod(notification.dateCreated) || "dateCreated"}
                  </Typography>
                }
              />
              <Lens
                color="primary"
                className={classNames({
                  [classes.iconUnread]: true,
                  [classes.hidden]: notification.isRead,
                })}
              />
              <IconButton
                onClick={handleDeleteNotification(notification.id)}
                className={classNames(classes.markAsReadButton, classes.markAsReadButtonVisibility)}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))
        )}
      </List>
    </>
  );
}
