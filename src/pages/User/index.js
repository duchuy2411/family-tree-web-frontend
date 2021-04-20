import React from "react";

// hooks
import useUserPageStyle from "./useUserPageStyles";

export default function UserPage() {
  const classes = useUserPageStyle();
  return (
    <div className={classes.root}>
      <div>User page</div>
      <div>User page</div>
      <div>User page</div>
      <div>User page</div>
      <div>User page</div>
    </div>
  );
}
