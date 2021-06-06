import { Icon } from "@material-ui/core";
import React from "react";

const SvgIcon = ({ svgSrc, ...rest }) => {
  return (
    <Icon
      style={{
        display: "flex",
        height: "inherit",
        width: "inherit",
      }}
      {...rest}
    >
      <img src={svgSrc} alt="svg icon" />
    </Icon>
  );
};

export default React.memo(SvgIcon);
