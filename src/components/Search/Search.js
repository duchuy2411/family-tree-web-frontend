import { InputBase, Paper } from "@material-ui/core";
import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F2E1DA",
    borderRadius: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    width: 400,
    padding: "2px 8px",
  },
  searchIcon: {
    marginRight: "4px",
  },
}));
export default function SearchBox() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} evaluation={3}>
      <InputBase
        fullWidth
        startAdornment={<SearchIcon className={classes.searchIcon} />}
        inputProps={{ "aria-label": "search person in your family tree" }}
      />
    </Paper>
  );
}
