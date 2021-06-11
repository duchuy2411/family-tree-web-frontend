import { configureStore } from "@reduxjs/toolkit";
import customTreeReducer from "../pages/CustomTree/customTreeSlice";
import authReducer from "./authSlice";
import calendarReducer from "../pages/Calendar/calendarSlice";
import notificationsReducer from "../layouts/Main/components/AppBar/slice";

export default configureStore({
  reducer: {
    custom_tree: customTreeReducer,
    auth: authReducer,
    calendar: calendarReducer,
    notifications: notificationsReducer,
  },
});
