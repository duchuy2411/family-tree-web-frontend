import axios from "axios";
import _ from 'lodash';

const version = 1;
const baseUrl = `https://family-tree.azurewebsites.net/api/v${version}`;

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

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
    let refreshToken = localStorage.getItem("refreshToken");

    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseUrl}/authentication/refresh_token`, {
          refreshToken: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

//functions to make api calls
const api = {
  signup: (body) => {
    return axios.post(`${baseUrl}/authentication/register`, body);
  },
  login: (body) => {
    return axios.post(`${baseUrl}/authentication/login`, body);
  },
  refreshToken: (body) => {
    return axios.post(`${baseUrl}/authentication/refresh_token`, body);
  },
  logout: (body) => {
    return axios.delete(`${baseUrl}/authentication/logout`, body);
  },
  // trees
  getAllTrees: () => {
    // for test purpose
    return axios.get(`${baseUrl}/tree-management/tree`);
  },
  //
  createTree: (body) => {
    return axios.post(`${baseUrl}/tree-management/tree`, body);
  },
  // custom-tree
  fetchFamilyTreeById: (id) => {
    return axios.get(`${baseUrl}/tree-management/tree/${id}`);
  },

};

export default api;
