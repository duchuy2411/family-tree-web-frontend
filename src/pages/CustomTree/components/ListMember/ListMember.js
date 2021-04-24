import React from "react";
import {
  Paper,
  makeStyles,
  Grid,
  ButtonBase,
  Typography,
} from "@material-ui/core";

import classNames from "classnames";
import { ArrowDropDown } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
  typoBold: {
    fontWeight: 900,
  },
}));
export default function ListMember(props) {
  const {
    className,
    listSearch,
    handleClickItemSearch
  } = props;

  const classes = useStyles();
  const listMemberClasses = classNames({
    [classes.root]: true,
    [className]: className,
  });

  const memberRows = listSearch.map((member, index) => {
    return (
      <div onClick={() => handleClickItemSearch(member.key)} key={index}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.typoBold}>{member.n}</Typography>
          </Grid>
          {/* <Grid item xs={2}>
            <Typography variant="body2">{member.id}</Typography>
          </Grid> */}
          {/* <Grid item xs={5} container justify="space-between">
            <Typography className={classes.typoBold}>
              {member.s}
            </Typography>
            <ButtonBase>
              <ArrowDropDown />
            </ButtonBase>
          </Grid> */}
        </Grid>
      </div>
    );
  });

  return (
    <Paper elevation={9} className={listMemberClasses}>
      {memberRows}
    </Paper>
  );
}