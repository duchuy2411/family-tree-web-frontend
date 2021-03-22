import { Grid, IconButton, Paper } from "@material-ui/core";
import React from "react";

import { makeStyles } from "@material-ui/core";
import { ReactComponent as SelectIcon } from "./../../assets/svg/select.svg";
import PanToolIcon from "@material-ui/icons/PanTool";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import RedoIcon from "@material-ui/icons/Redo";
import UndoIcon from "@material-ui/icons/Undo";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 110,
    margin: theme.spacing(2),
  },
  horizontalSet: {
    backgroundColor: "#905842",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  verticalSet: {
    backgroundColor: "#905842",
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
  },
  icon: {
    width: 25,
    height: 25,
    fill: "#fff",
  },
}));
export default function ToolSet({ tools }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      //   alignItems="center"
      className={classes.root}
      spacing={1}
    >
      <Grid item container direction="row" justify="space-between" xs={12}>
        {/* item 0: 2 tools vertically placed */}
        <Paper className={classes.verticalSet} elevation={3}>
          <IconButton>
            <SelectIcon className={classes.icon} />
          </IconButton>
          <IconButton>
            <PanToolIcon className={classes.icon} />
          </IconButton>
        </Paper>
        {/* item 1: 2 tools vertically placed */}
        <Paper className={classes.verticalSet} elevation={3}>
          <IconButton>
            <ZoomInIcon className={classes.icon} />
          </IconButton>
          <IconButton>
            <ZoomOutIcon className={classes.icon} />
          </IconButton>
        </Paper>
      </Grid>
      {/* item 2: 2 tools horizontally placed */}
      <Grid item>
        <Paper className={classes.horizontalSet} elevation={3}>
          <IconButton>
            <UndoIcon className={classes.icon} />
          </IconButton>
          <IconButton
          //   style={{ alignSelf: "flex-end" }}
          >
            <RedoIcon className={classes.icon} />
          </IconButton>
        </Paper>
      </Grid>
      {/* item 3: 4 tools */}
      <Grid item>
        <Paper className={classes.verticalSet} elevation={3}>
          <div className={classes.horizontalSet}>
            <IconButton>
              <AddIcon className={classes.icon} />
            </IconButton>
            <IconButton>
              <DeleteIcon className={classes.icon} />
            </IconButton>
          </div>
          <div className={classes.horizontalSet}>
            <IconButton>
              <LinkIcon className={classes.icon} />
            </IconButton>
            <IconButton>
              <LinkOffIcon className={classes.icon} />
            </IconButton>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
