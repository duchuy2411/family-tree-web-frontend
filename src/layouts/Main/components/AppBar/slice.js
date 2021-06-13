import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../utils/api";

const sampleNotifications = [
  {
    id: 1,
    message: "Message with id 1",
    dateCreated: new Date(Date.now()).toLocaleString(),
    isRead: false,
  },
  {
    id: 2,
    message: "Message with id 2",
    dateCreated: new Date(Date.now()).toLocaleString(),
    isRead: false,
  },
  {
    id: 3,
    message: "Message with id 3",
    dateCreated: new Date(Date.now()).toLocaleString(),
    isRead: true,
  },
  {
    id: 4,
    message: "Message with id 4",
    dateCreated: new Date(Date.now()).toLocaleString(),
    isRead: false,
  },
  {
    id: 5,
    message: "Message with id 5",
    dateCreated: new Date(Date.now()).toLocaleString(),
    isRead: true,
  },
];

export const getAllNotifications = createAsyncThunk(
  "notifications/getAllNotifications",
  async () => {
    const response = await api.getAllNotifications();
    const { message, errors, data } = response.data;

    console.log("getAllNotifications - response.data.data: ", data);

    return { message, errors, data };
  }
);

export const markAnNotificationAsRead = createAsyncThunk(
  "notifications/markAnNotificationAsRead",
  async (idNotification) => {
    const response = await api.markAnNotificationsAsRead(idNotification);
    const { message, errors, data } = response.data;

    console.log("markAnNotificationAsRead - response.data.data: ", data);

    return { message, errors, data };
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    isLoading: false,
    notifications: sampleNotifications, // TODO: delete when attach api for calendar
    message: "",
    errors: null,
  },
  reducers: {},
  extraReducers: {
    [getAllNotifications.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllNotifications.fulfilled]: (state, action) => {
      const { message, errors, data } = action.payload;

      console.log("getAllNotifications.fulfilled - message: ", message);
      console.log("getAllNotifications.fulfilled - errors: ", errors);
      console.log("getAllNotifications.fulfilled - data: ", data);
      state.notifications = data;
      state.message = message;
      state.errors = errors;
      state.isLoading = false;
    },
    [getAllNotifications.rejected]: (state, action) => {
      state.errors = action.error;
      state.isLoading = false;
    },

    [markAnNotificationAsRead.pending]: (state) => {
      state.isLoading = true;
    },
    [markAnNotificationAsRead.fulfilled]: (state, action) => {
      const { message, errors, data } = action.payload;

      // data: the notification that is marked read
      const newNotificationsList = state.notifications.map((notification) => {
        if (notification.id === data.id) {
          return data;
        }
        return notification;
      });

      state.notifications = newNotificationsList;
      state.message = message;
      state.errors = errors;
      state.isLoading = false;
    },
    [markAnNotificationAsRead.rejected]: (state, action) => {
      state.errors = action.error;
      state.isLoading = false;
    },
  },
});

// selectors
export const selectIsLoading = (state) => state.notifications.isLoading;
export const selectNotifications = (state) => state.notifications.notifications;

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice.reducer;
