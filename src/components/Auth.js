// import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useChangeInputConfig from "./hooks/useAuth";
import useFetchAPI from "./hooks/useFetchAPI";
import useAlertMessage from "./hooks/useAlertMessage";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));


//=====================================================================================//
//=====================================================================================//
export default function Auth(props) {
  let isLogin = props.match.path === "/login";
  let buttonTitle = isLogin ? "Login" : "Sign up";
  let apiURL = isLogin ? "/users/login" : "/users/sign-up";
  const [toggle,  handleMessageClose] = useAlertMessage();
  const [
    { isLoading, response, error },
    handleAPICallButtonSubmit,
  ] = useFetchAPI(apiURL);
  const classes = useStyles();
  const [
    email,
    handleEmailChange,
    isEmailError,
    emailErrorMessage,
    canEmailSubmit,
    clearEmailInput,
  ] = useChangeInputConfig("email");
  const [
    password,
    handlePasswordChange,
    isPasswordError,
    passwordErrorMessage,
    canPasswordSubmit,
    clearPasswordInput,
  ] = useChangeInputConfig("password");
  const [
    username, 
    handleUsernameChange,
    isUsernameError,
    usernameErrorMessage,
    canUsernameSubmit,
    clearUsernameInput,
  ] = useChangeInputConfig("username");


  //=====================================================================================//
  //=====================================================================================//
  function handleSubmit(e) {
    e.preventDefault();
    const user = isLogin ? { email, password } : { email, username, password };
    handleAPICallButtonSubmit({
      method: "post",
      data: {
        ...user,
      },
    });
    clearEmailInput();
    clearUsernameInput();
    clearPasswordInput();
  }

  //=====================================================================================//
  //=====================================================================================//
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //=====================================================================================// 
  //=====================================================================================//

  function successMessage() {
    return (
      <Snackbar
        open={toggle}
        autoHideDuration={6000}
        onClose={handleMessageClose}
        // style={{ transform: "translateY(-500px)" }}
      >
        <Alert onClose={handleMessageClose} severity="success">
          {response}
        </Alert>
      </Snackbar>
    );
  }
  //=====================================================================================//
  //=====================================================================================//

  function errorMessage() {

    return (
      <Snackbar
        open={toggle}
        autoHideDuration={6000}
        onClose={handleMessageClose}
        // style={{ transform: "translateY(-500px)" }}
      >
        <Alert onClose={handleMessageClose} severity="error">
          {response}
        </Alert>
      </Snackbar>
    );

  }
  //=====================================================================================//
  //=====================================================================================//

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  //=====================================================================================//
  //=====================================================================================//
  
  return (
    <Grid container spacing={0} justify="center">
      {response && successMessage()}
      {error && errorMessage()}
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid item m={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={isEmailError}
            helperText={emailErrorMessage}
          />
        </Grid>
        {!isLogin && (
          <Grid item m={6}>
            <TextField
              value={username}
              onChange={handleUsernameChange}
              name="username"
              fullWidth
              label="Username"
              error={isUsernameError}
              helperText={usernameErrorMessage}
            />
          </Grid>
        )}
        <Grid item m={6}>
          <TextField
            fullWidth
            value={password}
            label="Password"
            name="password"
            onChange={handlePasswordChange}
            error={isPasswordError}
            helperText={passwordErrorMessage}
          />
        </Grid>
        <Grid style={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            disabled={
              isLogin
                ? canEmailSubmit || canPasswordSubmit
                : canEmailSubmit || canPasswordSubmit || canUsernameSubmit
            }
          >
            {buttonTitle}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}