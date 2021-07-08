import axiosClient from "api";

import apiTreeManagement from "./apiTreeManagement";

const version = 1;
const baseUrl = `https://family-tree.azurewebsites.net/api/v${version}`;

// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
//     console.log("accessToken in axios client: ", accessToken);

//     if (accessToken) {
//       config.headers["x-auth-token"] = accessToken;
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// //response interceptor to refresh token on receiving token expired error
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;
//     let refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
//     if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       return axios
//         .post(
//           `${baseUrl}/authentication/refresh-access-token`,
//           { refreshToken: `${refreshToken}` },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           if (res.status === 200) {
//             localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.data.data.accessToken);
//             return axios(originalRequest);
//           }
//         });
//     }
//     return Promise.reject(error);
//   }
// );

//functions to make api calls
const api = {
  baseUrl: `https://family-tree.azurewebsites.net/api/v${version}`,
  signup: (body) => {
    return axiosClient.post(`${baseUrl}/authentication/register`, body);
  },
  login: (body) => {
    return axiosClient.post(`${baseUrl}/authentication/login`, body);
  },
  refreshToken: (body) => {
    return axiosClient.post(`${baseUrl}/authentication/refresh_token`, body);
  },
  logout: (body) => {
    return axiosClient.delete(`${baseUrl}/authentication/logout`, body);
  },

  // user
  updateUser: (body) => {
    return axiosClient.put(`${baseUrl}/user-management/user`, body);
  },
  getUserByToken: () => {
    return axiosClient.get(`${baseUrl}/user-management/user-by-token`);
  },

  // trees
  getAllTrees: () => {
    // for test purpose
    return axiosClient.get(`${baseUrl}/tree-management/trees`);
  },
  //
  createTree: (body) => {
    return axiosClient.post(`${baseUrl}/tree-management/tree`, body);
  },
  // custom-tree
  fetchFamilyTreeById: (id) => {
    return axiosClient.get(`${baseUrl}/tree-management/tree/${id}`);
  },
  getTreeList: () => {
    return axiosClient.get(`${baseUrl}/tree-management/trees/list`);
  },
  getTreesPublic: () => {
    return axiosClient.get(`${baseUrl}/tree-management/trees`);
  },
  updateFamilyTree: (treeId, payload) => {
    return axiosClient.put(`${baseUrl}/tree-management/tree/${treeId}`, payload);
  },
  deleteFamilyTree: (treeId) => {
    return axiosClient.delete(`${baseUrl}/tree-managemnet/tree/${treeId}`);
  },
  createParent: (personId, payload) => {
    return axiosClient.post(`${baseUrl}/person-management/person/${personId}/parent`, payload);
  },
  createSpouse: (personId, payload) => {
    return axiosClient.post(`${baseUrl}/person-management/person/${personId}/spouse`, payload);
  },
  getPerson: (personId) => {
    return axiosClient.get(`${baseUrl}/person-management/person/${personId}`);
  },
  getChildOfPerson: (personId) => {
    return axiosClient.get(`${baseUrl}/person-management/person/${personId}/`);
  },
  updatePerson: (personId, payload) => {
    return axiosClient.put(`${baseUrl}/person-management/person/${personId}`, payload);
  },
  deletePerson: (personId) => {
    return axiosClient.delete(`${baseUrl}/person-management/person/${personId}`);
  },
  createChild: (payload) => {
    return axiosClient.post(`${baseUrl}/person-management/person/child`, payload);
  },
  uploadImage: (file, config) => {
    return axiosClient.post(`${baseUrl}/file-upload/image`, file, config);
  },
  uploadArrImage: (file, config) => {
    return axiosClient.post(`${baseUrl}/file-upload/images`, file, config);
  },
  getEditorTree: (treeId) => {
    return axiosClient.get(`${baseUrl}/tree-management/tree/${treeId}/editors`);
  },
  fetchCalendar: (treeId) => {
    return axiosClient.get(`${baseUrl}/calendar-management/events/tree/${treeId}`);
  },
  createCalendar: (payload) => {
    return axiosClient.post(`${baseUrl}/calendar-management/event`, payload);
  },
  deleteCalendar: (eventId) => {
    return axiosClient.delete(`${baseUrl}/calendar-management/event/${eventId}`);
  },
  updateCalendar: (eventId, payload) => {
    return axiosClient.put(`${baseUrl}/calendar-management/event/${eventId}`, payload);
  },
  updateCalendarReschedule: (eventId, payload) => {
    return axiosClient.put(`${baseUrl}/calendar-management/event/${eventId}/reschedule`, payload);
  },
  updateCalendarCancel: (eventId, payload) => {
    return axiosClient.put(`${baseUrl}/calendar-management/event/${eventId}/cancel`, payload);
  },
  fetchMemory: (treeId) => {
    return axiosClient.get(`${baseUrl}/memory-management/memories/tree/${treeId}`);
  },
  createMemory: (payload) => {
    return axiosClient.post(`${baseUrl}/memory-management/memory`, payload);
  },
  deleteMemory: (memoryId) => {
    return axiosClient.delete(`${baseUrl}/memory-management/memory/${memoryId}`);
  },
  importTree: (file, config) => {
    return axiosClient.post(`${baseUrl}/tree-management/tree/import`, file, config);
  },
  exportJSON: (treeId) => {
    return axiosClient.post(`${baseUrl}/tree-management/tree/${treeId}/backup`);
  },
  getListByKeyword: (str) => {
    return axiosClient.get(`${baseUrl}/tree-management/trees-from-keyword`, {
      params: { q: str },
    });
  },
  getListConnectUser: () => {
    return axiosClient.post(`${baseUrl}/user-management/users`, {});
  },
  apiTreeManagement: apiTreeManagement,
};

export default api;
