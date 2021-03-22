import React from "react";
// react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// material-ui (MUI)
import { CssBaseline } from "@material-ui/core";
// components
import CustomBackDrop from "./components/BackDrop/CustomBackDrop";
// pages
import LogInPage from "./pages/LogIn";
import SignUpPage from "./pages/SignUp";

function App() {
  return (
    <Router>
      <React.Suspense fallback={<CustomBackDrop />}>
        <CssBaseline />
        {/* {isAuthenticated ? <Main /> : <Redirect to="/login" />} */}

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
          {/* <Route path="/test">
            <ToolSet />
          </Route> */}
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
