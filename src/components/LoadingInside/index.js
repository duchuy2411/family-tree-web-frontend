import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function LoadingInside(props) {
  const { isLoading, children, ...rest } = props;

  return (
    <div style={{ position: "relative" }} {...rest}>
      {children}

      {isLoading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -12,
            marginLeft: -12,
          }}
        />
      )}
    </div>
  );
}
