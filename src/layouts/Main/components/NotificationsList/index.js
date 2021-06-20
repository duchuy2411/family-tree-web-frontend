import React from "react";

import { List, ListItem, ListItemText, ButtonBase, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";
import { Lens } from "@material-ui/icons";
import classNames from "classnames";
import colors from "../../../../assets/colorPalette";

const useStyles = makeStyles(() => ({
  list: {
    // width: "100%",
    // maxWidth: "40ch",
    width: "40ch",
    padding: 12,
  },

  listItem: {
    padding: 8,
    borderRadius: 8,
    transition: "background-color 0.5s ease",
    "&:hover": {
      backgroundColor: colors.pink,
    },
  },
  hidden: {
    visibility: "hidden",
  },
}));

export default function NotificationsList(props) {
  const { notifications, handleTriggerRead } = props;

  const classes = useStyles();

  return (
    <>
      <List className={classes.list}>
        {notifications?.length === 0 ? (
          <div>{"You don't have any notifications"}</div>
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
                    variant="caption"
                    color={notification.isRead ? "textSecondary" : "textPrimary"}
                  >
                    {notification.dateCreated || "dateCreated"}
                  </Typography>
                }
              />
              <Lens
                color="primary"
                className={classNames({
                  [classes.hidden]: notification.isRead,
                })}
                style={{ fontSize: "small", color: colors.brown }}
              />
            </ListItem>
          ))
        )}
      </List>
    </>
  );
}
