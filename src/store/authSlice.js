import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

// const login = (state, action) => {
//   return { ...state, isAuthenticated: true, user: action.payload };
// };

// const logout = (state, action) => {
//   return { ...state, isAuthenticated: false, user: null };
// };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      return { ...state, isAuthenticated: true, user: action.payload };
    },
    logout(state, action) {
      return { ...state, isAuthenticated: false, user: null };
    },
    // login,
    // logout,
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
