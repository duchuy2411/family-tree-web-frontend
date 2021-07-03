import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "store/authSlice";
// react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// material-ui (MUI)
import { CssBaseline } from "@material-ui/core";
// components
import CustomBackDrop from "components/BackDrop/CustomBackDrop";
// lib
import { SnackbarProvider } from "notistack";
// pages
import Main from "layouts/Main/Main";
import LogInPage from "pages/LogIn";
import SignUpPage from "pages/SignUp";
import ForgotPasswordPage from "pages/ForgotPassword";
import ResetPasswordPage from "pages/ResetPassword";
import LOCAL_STORAGE_KEYS from "configs/localStorageKeys";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // get latest data from API
    // const getUserByToken = async () => {
    //   try {
    //     const response = await api.getUserByToken();
    //     console.log("getUserByToken - response: ", response);

    //     // user data
    //     const user = response?.data.data;
    //     if (user) {
    //       dispatch(authActions.setIsAuthenticated(true));
    //       dispatch(authActions.setUser(user));
    //       console.log("App.js dispatch setUser: ", user);
    //     }
    //   } catch (error) {
    //     console.log("Error in getUserByToken: ", error);
    //   }
    // };

    // getUserByToken();

    // //
    const authData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH));

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

        <SnackbarProvider maxSnack={3}>
          {/* Public routes */}
          <Switch>
            <Route path="/login">
              <LogInPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>

            <Route path="/reset-password">
              <ResetPasswordPage />
            </Route>

            <Main />
          </Switch>
        </SnackbarProvider>
      </React.Suspense>
    </Router>
  );
}

export default App;
