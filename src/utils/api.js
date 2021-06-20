import axios from "axios";

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

  // user
  updateUser: (body) => {
    return axios.put(`${baseUrl}/user-management/user`, body);
  },
  getUserByToken: () => {
    return axios.get(`${baseUrl}/user-management/user-by-token`);
  },

  // trees
  getAllTrees: () => {
    // for test purpose
    return axios.get(`${baseUrl}/tree-management/trees`);
  },
  //
  createTree: (body) => {
    return axios.post(`${baseUrl}/tree-management/tree`, body);
  },
  // custom-tree
  fetchFamilyTreeById: (id) => {
    return axios.get(`${baseUrl}/tree-management/tree/${id}`);
  },
  getTreeList: () => {
    return axios.get(`${baseUrl}/tree-management/trees/list`);
  },
  updateFamilyTree: (treeId, payload) => {
    return axios.put(`${baseUrl}/tree-management/tree/${treeId}`, payload);
  },
  deleteFamilyTree: (treeId) => {
    return axios.delete(`${baseUrl}/tree-managemnet/tree/${treeId}`);
  },
  createParent: (personId, payload) => {
    return axios.post(`${baseUrl}/person-management/person/${personId}/parent`, payload);
  },
  createSpouse: (personId, payload) => {
    return axios.post(`${baseUrl}/person-management/person/${personId}/spouse`, payload);
  },
  getPerson: (personId) => {
    return axios.get(`${baseUrl}/person-management/person/${personId}`);
  },
  getChildOfPerson: (personId) => {
    return axios.get(`${baseUrl}/person-management/person/${personId}/`);
  },
  updatePerson: (personId, payload) => {
    return axios.put(`${baseUrl}/person-management/person/${personId}`, payload);
  },
  deletePerson: (personId) => {
    return axios.delete(`${baseUrl}/person-management/person/${personId}`);
  },
  createChild: (payload) => {
    return axios.post(`${baseUrl}/person-management/person/child`, payload);
  },
  uploadImage: (file, config) => {
    return axios.post(`${baseUrl}/file-upload/image`, file, config);
  },
  uploadArrImage: (file, config) => {
    return axios.post(`${baseUrl}/file-upload/images`, file, config);
  },
  getEditorTree: (treeId) => {
    return axios.get(`${baseUrl}/tree-management/tree/${treeId}/editors`);
  },
  getCalendar: (treeId) => {
    return axios.get(`${baseUrl}/calendar-management/tree/${treeId}`);
  },
  createCalendar: (payload) => {
    return axios.post(`${baseUrl}/calendar-management/event`, payload);
  },
  deleteCalendar: (eventId) => {
    return axios.delete(`${baseUrl}/calendar-management/event/${eventId}`);
  },
  updateCalendar: (eventId, payload) => {
    return axios.put(`${baseUrl}/calendar-management/event/${eventId}`, payload);
  },
  updateCalendarReschedule: (eventId, payload) => {
    return axios.put(`${baseUrl}/calendar-management/event/${eventId}/reschedule`, payload);
  },
  updateCalendarCancel: (eventId, payload) => {
    return axios.put(`${baseUrl}/calendar-management/event/${eventId}/cancel`, payload);
  },
  fetchMemory: (treeId) => {
    return axios.get(`${baseUrl}/memory-management/memories/tree/${treeId}`);
  },
  createMemory: (payload) => {
    return axios.post(`${baseUrl}/memory-management/memory`, payload);
  },
  deleteMemory: (memoryId) => {
    return axios.delete(`${baseUrl}/memory-management/memory/${memoryId}`);
  },
  apiTreeManagement: apiTreeManagement,
};

export default api;
