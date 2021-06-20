import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import userAPI from "api/user";
import LoadingInside from "components/LoadingInside";
import { Redirect } from "react-router-dom";
import useResetPasswordPageStyles from "./styles";

const SUCCESS = 200;
const SEVERITY_TYPES = {
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
  ERROR: "error",
};
const timeToWait = 5; // second

export default function ResetPasswordPage() {
  const classes = useResetPasswordPageStyles();

  const [resetPasswordToken, setResetPasswordToken] = useState();
  const [email, setEmail] = useState();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(SEVERITY_TYPES.INFO);

  const [readyToRedirect, setReadyToRedirect] = useState(false);
  const [countDown, setCountDown] = useState(timeToWait);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { token, email } = params;

    setResetPasswordToken(token);
    setEmail(email);
  }, []);

  const handleChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangeConfirmNewPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSubmitNewPassword = async () => {
    try {
      setIsLoading(true);

      console.log("handleSubmitNewPassword");
      const response = await userAPI.updateNewPassword(newPassword, email, resetPasswordToken);

      if (response.status === SUCCESS) {
        setSeverity(SEVERITY_TYPES.SUCCESS);
        setMessage("Update password successfully!");
        setError("");
        setIsLoading(false);
      }
    } catch (error) {
      setSeverity(SEVERITY_TYPES.ERROR);
      //   setMessage(error?.response?.data?.message);
      setMessage("");
      setError(error?.response?.data?.data?.identityerrors[0].Description);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !error && severity === SEVERITY_TYPES.SUCCESS) {
      const interval = setInterval(() => setCountDown((prevCount) => prevCount - 1), 1 * 1000);

      const timeout = setTimeout(() => setReadyToRedirect(true), timeToWait * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isLoading, error, severity]);

  if (readyToRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={6} container justify="center">
          <Paper elevation={9} className={classes.paperFormWrapper}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h2"
                align="center"
                className={classes.marginBot24}
              >
                {"RESET PASSWORD"}
              </Typography>

              {error && (
                <Alert severity={severity} className={classes.alert}>
                  {error}
                </Alert>
              )}
              {message && (
                <Alert severity={severity} className={classes.alert}>
                  {message}
                </Alert>
              )}
              {severity === SEVERITY_TYPES.SUCCESS && (
                <Alert
                  severity="info"
                  className={classes.alert}
                >{`You will be redirect to login page after ${countDown}s`}</Alert>
              )}
            </Grid>

            <Grid item xs={12} className={classes.marginTop12}>
              <TextField
                value={newPassword}
                onChange={handleChangeNewPassword}
                variant="outlined"
                label={"New password"}
                placeholder={"Enter your new password"}
                className={classes.marginTop12}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={confirmNewPassword}
                onChange={handleChangeConfirmNewPassword}
                variant="outlined"
                label={"Confirm new password"}
                placeholder={"Enter your new password again"}
                className={classes.marginTop12}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingInside isLoading={isLoading}>
                <Button
                  variant="contained"
                  onClick={handleSubmitNewPassword}
                  disabled={
                    isLoading ||
                    severity === SEVERITY_TYPES.SUCCESS ||
                    !newPassword ||
                    newPassword !== confirmNewPassword
                  }
                  color="primary"
                  fullWidth
                  className={classes.button}
                >
                  {"SUBMIT"}
                </Button>
              </LoadingInside>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
