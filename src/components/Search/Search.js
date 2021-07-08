import React from "react";

// MUI
import { InputBase, makeStyles, Paper, IconButton } from "@material-ui/core";

// icons
import { Clear, Search as SearchIcon } from "@material-ui/icons";

import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    backgroundColor: "#F2E1DA",
    borderRadius: 10,
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    padding: theme.spacing(1, 2),
    width: "100%",
  },
  searchIcon: {
    marginRight: "4px",
    height: "100%",
  },
  searchInput: {
    width: "100%",
  },
  hide: {
    visibility: "hidden",
  },
}));

export default function SearchBox(props) {
  const { ariaLabel, className, search, handleChangeSearch, handleClearInput } = props;

  const classes = useStyles();
  const searchBoxClasses = classNames({
    [classes.searchBox]: true,
    [className]: className !== undefined,
  });

  return (
    <Paper className={searchBoxClasses}>
      <InputBase
        fullWidth
        className={classes.searchInput}
        startAdornment={<SearchIcon className={classes.searchIcon} />}
        inputProps={{ "aria-label": ariaLabel || "Search box" }}
        value={search}
        onChange={handleChangeSearch}
      />
      <IconButton
        onClick={handleClearInput}
        disableRipple
        size="small"
        className={classNames({
          [classes.hide]: !search,
        })}
      >
        <Clear />
      </IconButton>
    </Paper>
  );
}
