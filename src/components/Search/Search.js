import React from "react";

// MUI
import { InputBase, makeStyles, Paper } from "@material-ui/core";

// icons
import SearchIcon from "@material-ui/icons/Search";

import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    backgroundColor: "#F2E1DA",
    borderRadius: 10,
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    padding: theme.spacing(1, 2),
  },
  searchIcon: {
    marginRight: "4px",
    height: "100%",
  },
}));

export default function SearchBox(props) {
  const { ariaLabel, className, search, handleChangeSearch } = props;

  const classes = useStyles();
  const searchBoxClasses = classNames({
    [classes.searchBox]: true,
    [className]: className !== undefined,
  });

  return (
    <Paper className={searchBoxClasses} elevation={9}>
      <InputBase
        fullWidth
        startAdornment={<SearchIcon className={classes.searchIcon} />}
        inputProps={{ "aria-label": ariaLabel || "Search box" }}
        value={search}
        onChange={handleChangeSearch}
      />
    </Paper>
  );
}
