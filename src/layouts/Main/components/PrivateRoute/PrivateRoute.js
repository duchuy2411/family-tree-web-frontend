import LOCAL_STORAGE_KEYS from "configs/localStorageKeys";
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const authData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH));

  let isAuthenticated = false;
  if (authData) {
    isAuthenticated = authData.isAuthenticated;
  }

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
