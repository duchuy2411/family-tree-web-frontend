import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const ITEM_HEIGHT = 48;

const ListConnectUser = (props) => {
  const { selected, open, handleClose, anchorEl, options } = props;

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
      elevation={3}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} selected={option.value === selected} onClick={() => handleClose(option)}>
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ListConnectUser;