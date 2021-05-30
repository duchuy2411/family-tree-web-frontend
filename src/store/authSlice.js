import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  accessToken: '',
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
      localStorage.removeItem("auth");
      localStorage.removeItem("accessToken");
    },
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

// selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAccessToken = (state) => state.auth.accessToken;

export const authActions = authSlice.actions;
export default authSlice.reducer;
