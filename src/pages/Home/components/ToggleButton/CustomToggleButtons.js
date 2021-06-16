import React from "react";

// MUI
import { fade, withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    border: "none",
    width: 100,
    "&:not(:first-child)": {
      borderRadius: 16,
      marginLeft: theme.spacing(1),
    },
    "&:first-child": {
      borderRadius: 16,
    },
    fontWeight: 900,
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    "&$selected": {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
      },
      "& + &": {
        borderLeft: 0,
        marginLeft: 0,
      },
    },
    "&$disabled": {
      color: fade(theme.palette.action.disabled, 0.12),
    },
    "&:hover": {
      textDecoration: "none",
      // Reset on mouse devices
      backgroundColor: "transparent",
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
      "&$disabled": {
        backgroundColor: "transparent",
      },
    },
  },
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},
}))(ToggleButton);

export default function CustomToggleButton() {
  const [mode, setMode] = React.useState("preview");

  const handleChangeMode = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  return (
    <div>
      <StyledToggleButtonGroup
        size="small"
        value={mode}
        exclusive
        onChange={handleChangeMode}
        aria-label="choose mode"
      >
        <StyledToggleButton disableRipple value="preview" aria-label="preview tree">
          All
        </StyledToggleButton>

        <StyledToggleButton disableRipple value="edit" aria-label="edit tree">
          Latest
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </div>
  );
}
