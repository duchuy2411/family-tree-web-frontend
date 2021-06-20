import React from "react";

// MUI
import { fade, withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import colors from "../../../../assets/colorPalette";

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
      boxShadow: "0px 0px 8px 1px rgba(0, 0, 0, 0.1)",
      color: theme.palette.action.active,
      backgroundColor: colors.pink,
      "&:hover": {
        backgroundColor: fade(colors.pink, 0.8),
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
      backgroundColor: fade(colors.pink, 0.7),
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

export default function CustomToggleButton(props) {
  const { mode, handleExport, handleChangeMode, handleDownloadImage } = props;
  console.log("==mode==:", mode);
  return (
    <div>
      <StyledToggleButtonGroup
        size="small"
        value={mode}
        exclusive
        onChange={handleChangeMode}
        aria-label="choose mode"
      >
        { mode === "preview" &&
          (
            <div className="absolute-btn-download">
              <StyledToggleButton
                value="edit"
                aria-label="edit tree"
                onClick={handleExport}
                style={{marginRight: "10px"}}>
                Export to JSON
                <i className="fas fa-download" />
              </StyledToggleButton>
              <StyledToggleButton
                value="edit" aria-label="edit tree" onClick={handleDownloadImage}>
                Download Tree Image
                <i className="fas fa-download" />
              </StyledToggleButton>
            </div>
          )
        }
        <StyledToggleButton value="preview" aria-label="preview tree">
          Preview
        </StyledToggleButton>
        <StyledToggleButton value="edit" aria-label="edit tree">
          Edit
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    </div>
  );
}
