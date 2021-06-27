import axios from "axios";

// create axios client
import queryString from "query-string";
import { baseUrl } from "../configs";
import LOCAL_STORAGE_KEYS from "../configs/localStorageKeys";

const axiosClient = axios.create({
  baseURL: baseUrl,
  body: (data) => data,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Handle token
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    console.log("originalRequest: ", error.config);

    // refresh token expired, prevent infinite loop
    if (
      error.response.status === 400 &&
      originalRequest.url === `${baseUrl}/authentication/refresh-access-token`
    ) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH);

      window.location.href = "/login/";

      return Promise.reject(error);
    }

    // accessToken expired
    if (error.response.status === 401 && !originalRequest._retry) {
      let refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      originalRequest._retry = true;

      return axiosClient
        .post(
          `${baseUrl}/authentication/refresh-access-token`,
          { refreshToken: `${refreshToken}` },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const newAccessToken = res.data.data.accessToken;
            const newRefreshToken = res.data.data.newRefreshToken;
            localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);

            if (newRefreshToken) {
              localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
            }
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

            return axiosClient(originalRequest);
          }
        });
      // xu li refresh token expired o day cung duoc
      // .catch((error) => {})
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
