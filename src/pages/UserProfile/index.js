import React, { useEffect, useRef, useState } from "react";

import { unwrapResult } from "@reduxjs/toolkit";

import {
  Avatar,
  Button,
  ButtonBase,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

// hooks
import useProfilePageStyle from "./useProfilePageStyles";
import { useDispatch, useSelector } from "react-redux";

import { selectError, selectIsLoading, selectUser, updateUserAsync } from "../../store/authSlice";

import LoadingInside from "../../components/LoadingInside/index";

import avatarPlaceholder from "../../assets/img/Portrait_Placeholder.png";

import api from "../../utils/api";
import classNames from "classnames";
import { useSnackbar } from "notistack";

export default function ProfilePage() {
  const classes = useProfilePageStyle();

  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const [showPassword, setShowPassword] = useState(false);
  const [isAnyChanges, setIsAnyChanges] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const fileInputRef = useRef();
  const [file, setFile] = useState();
  const [avatarPreviewSrc, setAvatarSrc] = useState();

  const [infoValues, setInfoValues] = useState({
    firstName: currentUser?.firstName,
    midName: currentUser?.midName,
    lastName: currentUser?.lastName,
    avatarUrl: currentUser?.avatarUrl,
    address: currentUser?.address,
    phone: currentUser?.phone,
    gender: currentUser?.gender, // BE receive  0 or 1 or null (male or female or won't change prev gender value)
    dateOfBirth: currentUser?.dateOfBirth,
  });

  // check if there is any change in profile
  useEffect(() => {
    // check if any prop in sourceObj is different form targetObj
    const checkIfAnyChanges = (sourceObj, targetObj) => {
      for (let [key, value] of Object.entries(sourceObj)) {
        // console.log(`${key}: ${value}`);
        if (targetObj[key] !== value) {
          return true;
        }
      }

      return false;
    };

    if (currentUser) {
      const isChanged = checkIfAnyChanges(infoValues, currentUser);

      // console.log("isChanged: ", isChanged);
      setIsAnyChanges(isChanged);
    }

    if (file) {
      setIsAnyChanges(true);
    }
  }, [currentUser, infoValues, file]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // avatar
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  };

  // preview new avatar
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleSelectFile = (event) => {
    event.preventDefault();

    fileInputRef?.current.click();
  };
  // end preview new avatar

  const handleChangeInfo = (propName) => (event) => {
    let value = "";

    if (propName === "dateOfBirth") {
      value = event;
    } else {
      value = event.target.value;
    }

    setInfoValues({
      ...infoValues,
      [propName]: value,
    });
  };

  const handleUpdate = async () => {
    // upload avatar to 3rd platform end get its url
    try {
      let formData = new FormData();
      formData.append("file", file);

      const response = await api.uploadImage(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const {
        data,
        // errors,
        // message
      } = response.data;

      if (data) {
        // data = url
        infoValues.avatarUrl = data; // add to infoValues for coming update
        // message = message;
      }
    } catch (error) {
      //console.log("Error in upload avatar image: ", error);
    }

    try {
      const actionResult = await dispatch(updateUserAsync(infoValues));
      const currentUser = unwrapResult(actionResult);
      enqueueSnackbar("Update profile successfully", { variant: "success" });
    } catch (err) {
      // console.log("Error in handleUpdate: ", error);
      // load snackbar
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid container>
          <Grid item xs={12} style={{ marginTop: 24 }}>
            <div className={classes.pageTitle}>
              <Typography variant="h4" component="h2">
                Profile
              </Typography>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  // color="primary"
                  className={classNames(classes.marginLeft, classes.buttonUpdate)}
                  onClick={handleUpdate}
                  disabled={isLoading || !isAnyChanges}
                >
                  <LoadingInside isLoading={isLoading}>UPDATE</LoadingInside>
                </Button>
              </div>
            </div>
          </Grid>

          {/* Account information area */}
          <Grid item lg={12} container>
            <div className={classes.accountInfoContainer}>
              <div>
                <ButtonBase onClick={handleSelectFile}>
                  <Avatar
                    src={avatarPreviewSrc || currentUser?.avatarUrl || avatarPlaceholder}
                    style={{
                      width: "15vw",
                      height: "15vw",
                    }}
                  />
                </ButtonBase>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />
              </div>

              <div className={classes.accountInfoFieldsContainer}>
                <TextField
                  className={classes.accountInfoItem}
                  label="Username"
                  value={currentUser?.userName || ""}
                  required
                  fullWidth
                  disabled
                />

                <TextField
                  className={classes.accountInfoItem}
                  label="Email"
                  value={infoValues.email}
                  // onChange={handleChangeInfo("email")}
                  required
                  fullWidth
                />

                <TextField
                  className={classes.accountInfoItem}
                  label="New password"
                  placeholder="Enter new password"
                  value={infoValues.password}
                  onChange={handleChangeInfo("password")}
                  type={showPassword ? "text" : "password"}
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </Grid>

          {/* Personal information area */}
          <Grid item lg={12} style={{ marginTop: 24 }}>
            <Typography variant="h4">Personal Information</Typography>
            <div className={classes.detailsInfoContainer}>
              <TextField
                label="First name"
                value={infoValues.firstName}
                onChange={handleChangeInfo("firstName")}
                multiline
                className={classes.detailsInfoItem}
              />

              <TextField
                label="Mid name"
                value={infoValues.midName}
                onChange={handleChangeInfo("midName")}
                multiline
                className={classes.detailsInfoItem}
              />

              <TextField
                label="Last name"
                value={infoValues.lastName}
                onChange={handleChangeInfo("lastName")}
                multiline
                className={classes.detailsInfoItem}
              />

              <FormControl className={classes.detailsInfoItem}>
                <InputLabel htmlFor="gender-native-select">Gender</InputLabel>
                <Select
                  native
                  value={infoValues.gender}
                  onChange={handleChangeInfo("gender")}
                  inputProps={{
                    name: "gender",
                    id: "gender-native-select",
                  }}
                >
                  <option aria-label="None" value={null} />
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                </Select>
              </FormControl>

              <div className={classes.detailsInfoItem}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date of birth"
                    value={infoValues.dateOfBirth}
                    onChange={handleChangeInfo("dateOfBirth")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </div>

              <TextField
                label="Address"
                value={infoValues.address}
                // onChange={handleChangeAddress}
                onChange={handleChangeInfo("address")}
                multiline
                className={classes.detailsInfoItem}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
