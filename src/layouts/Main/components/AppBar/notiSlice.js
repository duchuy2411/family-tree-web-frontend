import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notificationAPI from "api/notification";

export const getAllNotifications = createAsyncThunk(
  "notifications/getAllNotifications",
  async () => {
    const response = await notificationAPI.getAllNotifications();
    const { message, errors, data } = response.data;

    console.log("getAllNotifications - response.data.data: ", data);

    return { message, errors, data };
  }
);

export const markAnNotificationAsRead = createAsyncThunk(
  "notifications/markAnNotificationAsRead",
  async (idNotification) => {
    const response = await notificationAPI.markAnNotificationsAsRead(idNotification);
    const { message, errors, data } = response.data;

    console.log("markAnNotificationAsRead - response.data.data: ", data);

    return { message, errors, data };
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (idNotification) => {
    const response = await notificationAPI.deleteNotification(idNotification);
    const { message, errors, data } = response.data;

    console.log("deleteNotification - response.data.data: ", data);

    return { message, errors, data, idNotificationWasRemoved: idNotification };
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    isLoading: false,
    notifications: [], // TODO: delete when attach notificationAPI for calendar
    message: "",
    errors: null,
  },
  reducers: {
    setNotificationsList: (state, action) => {
      state.notifications = action.payload;
    },
  },
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

    [deleteNotification.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteNotification.fulfilled]: (state, action) => {
      const { message, errors, idNotificationWasRemoved } = action.payload;

      const filteredNotificationsList = state.notifications.filter(
        (notification) => notification.id !== idNotificationWasRemoved
      );

      state.notifications = filteredNotificationsList;
      state.message = message;
      state.errors = errors;
      state.isLoading = false;
    },
    [deleteNotification.rejected]: (state, action) => {
      state.errors = action.error;
      state.isLoading = false;
    },
  },
});

// selectors
export const selectIsLoading = (state) => state.notifications.isLoading;
export const selectNotifications = (state) => state.notifications.notifications;
export const selectMessage = (state) => state.notifications.message;
export const selectError = (state) => state.notifications.error;

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice.reducer;
