import { Button, Grid } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import userAPI from "api/user";
import LoadingInside from "components/LoadingInside";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
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
          setMessage(`An email has been sent to ${email}`);
          setError("");
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error in handleSubmitEmail:", error.config);
        console.log(error);
        setError(error.message);
        setMessage("");
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} container justify="center" style={{ marginBottom: "10vh" }}>
          <div>Reset password page</div>
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}

          {message && (
            <Alert variant="filled" severity="success">
              {message}
            </Alert>
          )}
        </Grid>

        <Grid item xs={6} container justify="center">
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
            <LoadingInside isLoading={isLoading}>
              <Button
                onClick={handleSubmitEmail}
                disabled={email === "" || isLoading}
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 12 }}
              >
                SUBMIT
              </Button>
            </LoadingInside>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
