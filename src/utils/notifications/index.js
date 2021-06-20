export const getNumberOfUnread = (notifications) => {
  return notifications.filter((noti) => noti.isRead === false).length;
};
