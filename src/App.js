import React, { useEffect } from "react";
// react-router-dom
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
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
import { useDispatch, useSelector } from "react-redux";
import { authActions, selectIsLoading, selectUser } from "./store/authSlice";

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const isLoading = useSelector(selectIsLoading);
  // const history = useHistory();

  // if (isAuthenticated) {
  //   history.goBack();
  //   return;
  // }

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    console.log("authData: ", authData);

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
            <LogInPage
            // isLoading={isLoading}
            />
          </Route>
          <Route path="/signup">
            <SignUpPage
            // isLoading={isLoading}
            />
          </Route>
          {/* <Route path="/forget-password">
            <ForgetPasswordPage />
          </Route> */}

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
