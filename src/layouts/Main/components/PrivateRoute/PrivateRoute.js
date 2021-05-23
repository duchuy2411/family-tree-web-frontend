import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const authData = JSON.parse(localStorage.getItem("auth"));
  console.log("authData:", authData);

  let isAuthenticated = false;
  if (authData) {
    isAuthenticated = authData.isAuthenticated;
  }
  // else {
  //   isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // }

  // const current
  console.log("PrivateRoute-isAuthenticated: ", isAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                referrer: location,
              },
            }}
          />
        );
      }}
    />
  );
}
