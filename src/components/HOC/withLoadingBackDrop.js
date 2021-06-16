import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/authSlice";
import CustomBackDrop from "../BackDrop/CustomBackDrop";

// export default function withLoadingBackDrop(Component) {
//   return React.memo((props) => {
//     const { isLoading, ...rest } = props;

//     if (!isLoading) {
//       return <Component {...rest} />;
//     }
//     return <CustomBackDrop color="primary" />;
//   });
// }

const withLoadingBackDrop = (Component) => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) {
    return <Component />;
  }
  return <CustomBackDrop color="primary" />;
};

export default React.memo(withLoadingBackDrop);
