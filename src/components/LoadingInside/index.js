import { CircularProgress } from "@material-ui/core";
import colors from "assets/colorPalette";
import React from "react";

export default function LoadingInside(props) {
  const { isLoading, children, indicatorSize = 24, ...rest } = props;

  return (
    <div style={{ position: "relative" }} {...rest}>
      {children}

      {isLoading && (
        <CircularProgress
          size={indicatorSize}
          style={{
            color: colors.brown,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -indicatorSize / 2,
            marginLeft: -indicatorSize / 2,
          }}
        />
      )}
    </div>
  );
}
