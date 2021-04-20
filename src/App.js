import React from "react";
// react-router-dom
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// material-ui (MUI)
import { CssBaseline } from "@material-ui/core";
// components
import CustomBackDrop from "./components/BackDrop/CustomBackDrop";
// pages
import LogInPage from "./pages/LogIn";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import Main from "./layouts/Main/Main";

function App() {
  const isAuthenticated = true;
  return (
    <Router>
      <React.Suspense fallback={<CustomBackDrop />}>
        <CssBaseline />
        {isAuthenticated ? <Main /> : <Redirect to="/login" />}

        {/* Public routes */}
        <Switch>
          <Route path="/login">
            <LogInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          {/* <Route path="/forget-password">
            <ForgetPasswordPage />
          </Route> */}

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
