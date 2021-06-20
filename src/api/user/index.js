import axiosClient from "api";

const userAPI = {
  requestResetPasswordWithEmail: (email) => {
    const url = "/user-management/reset-password-token";
    const data = {
      email: email,
    };
    return axiosClient.post(url, data);
  },
  updateNewPassword: (newPassword, email, token) => {
    const url = "/user-management/reset-password";

    const data = {
      password: newPassword,
      email: email,
      token: token,
    };

    return axiosClient.post(url, data);
  },
};

export default userAPI;
