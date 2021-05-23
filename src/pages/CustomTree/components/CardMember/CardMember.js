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

export default function CardMember(props) {
  const {
    model
  } = props;
  const classes = useCardMemberStyles();

  return (
    <Card raised className={classes.card}>
      <CardContent>
        <div className={classes.avatarContainer}>
          <Avatar alt="Marc" src={model.image} className={classes.avatar} />
        </div>
        <div className={classes.infoRow}>
          <Typography className={classes.name}>{model.name}</Typography>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </div>
        <div className={classes.infoRow}>
          <Typography>{`Gender: ${model.gender}`}</Typography>
        </div>
        <div className={classes.infoRow}>
          <Typography>DOB: {model.dob}</Typography>  
        </div>
        {
          model.dod && (
            <div className={classes.infoRow}>
              <Typography>DOD: {model.dod}</Typography>  
            </div>
          )
        }
      </CardContent>
    </Card>
  );
}
