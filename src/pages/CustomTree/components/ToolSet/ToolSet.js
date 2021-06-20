import React from "react";
import classNames from "classnames";

// MUI
import { Grid, IconButton, Paper } from "@material-ui/core";

// icons
import PanToolIcon from "@material-ui/icons/PanTool";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import RedoIcon from "@material-ui/icons/Redo";
import UndoIcon from "@material-ui/icons/Undo";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import { ReactComponent as SelectIcon } from "../../../../assets/svg/select.svg";

import useToolSetStyles from "./useToolSetStyles";

export default function ToolSet({ className }) {
  const classes = useToolSetStyles();
  const toolSetClasses = classNames({
    [classes.toolSet]: true,
    [className]: className !== undefined,
  });

  return (
    <Grid container direction="column" className={toolSetClasses} spacing={1}>
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
