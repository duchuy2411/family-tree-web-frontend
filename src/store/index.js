import { configureStore } from "@reduxjs/toolkit";
import customTreeReducer from "../pages/CustomTree/customTreeSlice";
import authReducer from "./authSlice";
import calendarReducer from "../pages/Calendar/calendarSlice";

export default configureStore({
  reducer: {
    custom_tree: customTreeReducer,
    auth: authReducer,
    calendar: calendarReducer,
  },
});
