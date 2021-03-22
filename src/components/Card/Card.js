import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import marcAva from "./../../assets/img/face/marc.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 300,
    backgroundColor: "#F2E1DA",
    borderRadius: theme.spacing(1),
  },
  bigAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
}));

export default function SimpleCard() {
  const classes = useStyles();
  const info = {
    name: "Marc Allen",
    birth: "29/03/1978",
    dead: "31/10/2019",
    sex: "Male",
    relationship: "Uncle",
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.imgContainer}>
          <Avatar alt="Marc" src={marcAva} className={classes.bigAvatar} />
        </div>
        <div className={classes.infoContainer}>
          <Typography className={classes.name}>{info.name}</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <div className={classes.infoContainer}>
          <Typography>{`${info.birth} - ${info.dead}`}</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <div className={classes.infoContainer}>
          <Typography>{`Gender: ${info.sex}`}</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <div className={classes.infoContainer}>
          <Typography>{`Realationship: ${info.relationship}`}</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
