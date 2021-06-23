import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LOCAL_STORAGE_KEYS from "configs/localStorageKeys";
import api from "../utils/api";

export const updateUserAsync = createAsyncThunk("authentication/updateUser", async (params) => {

  const response = await api.updateUser(params);

  return response.data;
});

const initialAuthState = {
  isLoading: false,
  error: "",
  message: "",
  isAuthenticated: false,
  user: null,
  accessToken: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    login(state, action) {
      const user = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      const authData = {
        isAuthenticated: true,
        user: user,
      };
      localStorage.setItem("auth", JSON.stringify(authData));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem("auth");
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    },
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: {
    [updateUserAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [updateUserAsync.fulfilled]: (state, action) => {
      const { data, message, error } = action.payload;

      state.isLoading = false;
      state.error = error;
      state.message = message;

      const updatedUserInfo = data;

      if (updatedUserInfo) {
        state.user = { ...state.user, ...updatedUserInfo };

        const auth = JSON.parse(localStorage.getItem("auth"));

        localStorage.setItem(
          "auth",
          JSON.stringify({
            isAuthenticated: true,
            user: {
              ...auth.user,
              ...updatedUserInfo,
            },
          })
        );
      }
    },
  },
});

// selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectAccessToken = (state) => state.auth.accessToken;

export const authActions = authSlice.actions;
export default authSlice.reducer;
