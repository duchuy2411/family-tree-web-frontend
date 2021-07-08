import React from "react";
import { Paper, makeStyles, Grid, Typography } from "@material-ui/core";
import _ from "lodash";
import classNames from "classnames";
import colors from "assets/colorPalette";

const useStyles = makeStyles(() => ({
  root: {},
  typoBold: {
    fontWeight: 900,
    backgroundColor: colors.blue4,
    marginTop: "2px",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "4px 20px",
    color: colors.white,
    "&:hover": {
      backgroundColor: colors.blue3,
    },
  },
}));
export default function ListMember(props) {
  const { className, listSearch, handleClickItemSearch } = props;

  const classes = useStyles();
  const listMemberClasses = classNames({
    [classes.root]: true,
    [className]: className,
  });

  const memberRows = _.filter(listSearch, (ele) => ele.type !== "U").map((member, index) => {
    return (
      <div onClick={() => handleClickItemSearch(member.key)} key={index}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.typoBold}>{member.n}</Typography>
          </Grid>
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
