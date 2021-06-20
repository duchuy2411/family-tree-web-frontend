export const getNumberOfUnread = (notifications) => {
  return notifications.filter((noti) => noti.isRead === false).length;
};

/**
 *
 * @param {DateTime} IOSDateTime e.g: 2021-06-05T18:09:45Z
 */
export const convertTimeToPeriod = (ISODateTime) => {
  const inputTime = new Date(ISODateTime).getTime();
  const now = new Date(Date.now()).getTime();

  const milliseconds = now - inputTime;
  const seconds = parseInt(milliseconds / 1000);
  const minutes = parseInt(seconds / 60);
  const hours = parseInt(minutes / 60);
  const days = parseInt(hours / 24);
  const weeks = parseInt(days / 7);
  const months = parseInt(days / 30);
  const years = parseInt(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes${minutes > 1 ? "s" : ""} ago`;
  }
  if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }

  return null;
};
