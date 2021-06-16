import React from "react";
import CustomBackDrop from "../BackDrop/CustomBackDrop";

export default function withLoading(Component) {
  return React.memo((props) => {
    const { isLoading, ...rest } = props;

    if (!isLoading) {
      return <Component {...rest} />;
    }
    return <CustomBackDrop color="primary" />;
  });
}
