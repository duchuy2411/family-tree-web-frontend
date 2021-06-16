import { Badge } from "@material-ui/core";
import React from "react";

export default function CustomBadge({
  children,
  overlap,
  anchorOrigin,
  badgeContent,
}) {
  return (
    <Badge
      overlap={overlap}
      anchorOrigin={anchorOrigin}
      badgeContent={badgeContent}
    >
      {children}
    </Badge>
  );
}
