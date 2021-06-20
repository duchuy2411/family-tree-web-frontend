import axios from "axios";

// create axios client
import queryString from "query-string";
import { baseUrl } from "../configs";
import LOCAL_STORAGE_KEYS from "../configs/localStorageKeys";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
    // console.log('axiosClient.interceptors.request - accessToken: ', accessToken);

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
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
            localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.data.data.accessToken);
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
