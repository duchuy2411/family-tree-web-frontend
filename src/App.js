import React, { useEffect } from "react";
// react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// material-ui (MUI)
import { CssBaseline } from "@material-ui/core";
// components
import CustomBackDrop from "./components/BackDrop/CustomBackDrop";
// pages
import LogInPage from "./pages/LogIn";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import Main from "./layouts/Main/Main";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));

    if (authData) {
      const { isAuthenticated, user } = authData;

      dispatch(authActions.setIsAuthenticated(isAuthenticated));
      dispatch(authActions.setUser(user));
    }
  }, [dispatch]);

  return (
    <Router>
      <React.Suspense fallback={<CustomBackDrop />}>
        <CssBaseline />

        {/* Public routes */}
        <Switch>
          <Route path="/login">
            <LogInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>

          <Main />

          {/* Test */}
          <Route path="/test">
            <HomePage />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
