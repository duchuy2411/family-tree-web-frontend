import React, { useState } from "react";
import { Button, Grid, TextField, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LoadingInside from "components/LoadingInside";
import userAPI from "api/user";
import useForgotPasswordPageStyles from "./styles";

export default function ForgotPasswordPage() {
  const classes = useForgotPasswordPageStyles();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = async () => {
    if (email) {
      try {
        setIsLoading(true);
        const response = await userAPI.requestResetPasswordWithEmail(email);

        if (response.status === 200) {
          setMessage(`An email with reset password url has been sent to ${email}`);
          setError("");
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setMessage("");
        setIsLoading(false);
      }
    }
  };

  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Grid item xs={12} container justify="center">
            <Typography variant="h4" className={classes.title}>
              {"FORGOT PASSWORD"}
            </Typography>

            {error && (
              <Alert variant="filled" severity="error" className={classes.alert}>
                {error}
              </Alert>
            )}

            {message && (
              <Alert variant="filled" severity="success" className={classes.alert}>
                {message}
              </Alert>
            )}
          </Grid>

          <Grid item xs={12} container justify="center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={email}
                onChange={handleChangeEmail}
                label={"Email"}
                placeholder={"Enter your email"}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={handleSubmitEmail}
                disabled={email === "" || isLoading}
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
              >
                <LoadingInside isLoading={isLoading}>
                  <Typography variant="button">SUBMIT</Typography>
                </LoadingInside>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
