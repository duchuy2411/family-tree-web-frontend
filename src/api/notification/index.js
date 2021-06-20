import axiosClient from "api";

const notificationAPI = {
  getAllNotifications: () => {
    const url = "/user-management/notifications";

    return axiosClient.get(url);
  },

  markAnNotificationsAsRead: (idNotification) => {
    const url = `/user-management/notifications/${idNotification}`;

    return axiosClient.put(url);
  },

  deleteNotification: (idNotification) => {
    const url = `/user-management/notifications/${idNotification}`;

    return axiosClient.delete(url);
  },
};

export default notificationAPI;
