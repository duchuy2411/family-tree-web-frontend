import React from "react";
// MUI
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";

// icons
import EditIcon from "@material-ui/icons/Edit";

import useCardMemberStyles from "./useCardMemberStyles";

export default function CardMember({
  avatarUrl,
  name,
  birth,
  dead,
  sex,
  relationship,
}) {
  const classes = useCardMemberStyles();

  return (
    <Card raised className={classes.card}>
      <CardContent>
        <div className={classes.avatarContainer}>
          <Avatar alt="Marc" src={avatarUrl} className={classes.avatar} />
        </div>
        <div className={classes.infoRow}>
          <Typography className={classes.name}>{name}</Typography>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </div>
        <div className={classes.infoRow}>
          <Typography variant="body2">{`(${birth} - ${
            dead ? dead : "Alive"
          })`}</Typography>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </div>
        <div className={classes.infoRow}>
          <Typography>{`Gender: ${sex}`}</Typography>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </div>
        <Tooltip
          title="Relationship with the owner of this tree"
          arrow={true}
          interactive={true}
          leaveDelay={200}
        >
          <div className={classes.infoRow}>
            <Typography>{`Relationship: ${relationship}`}</Typography>
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </div>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
