import { configureStore } from "@reduxjs/toolkit";
import customTreeReducer from "../pages/CustomTree/customTreeSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    custom_tree: customTreeReducer,
    auth: authReducer,
  },
});
