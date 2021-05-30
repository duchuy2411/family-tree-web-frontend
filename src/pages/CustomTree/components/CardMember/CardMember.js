import React from "react";
// MUI
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";

// icons
import EditIcon from "@material-ui/icons/Edit";

import useCardMemberStyles from "./useCardMemberStyles";
import CONSTANTS from '../../../../utils/const'; 

export default function CardMember(props) {
  const { model } = props;
  const classes = useCardMemberStyles();
  const getImage = model.imageUrl || CONSTANTS.sourceDefaultImg;
  return (
    <Card raised className={classes.card}>
      <CardContent>
        <div className={classes.avatarContainer}>
          <Avatar alt="Marc" src={getImage} className={classes.avatar} />
        </div>
        <div className={classes.infoRow}>
          <Typography className={classes.name}>{model.name}</Typography>
          <IconButton size="small">
            {/* <EditIcon /> */}
          </IconButton>
        </div>
        { model.name && (
          <div className={classes.infoRow}>
            <Typography>{`Gender: ${model.gender}`}</Typography>
          </div>
        )}
        {
          model.dob && (
            <div className={classes.infoRow}>
              <Typography>DOB: {model.dob}</Typography>  
            </div>
          )
        }
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
