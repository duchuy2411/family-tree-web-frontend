import axiosClient from "api";
import axios from "axios";

const version = 1;
const baseUrl = `https://family-tree.azurewebsites.net/api/v${version}`;

const apiTreeManagement = {
  baseUrl: `https://family-tree.azurewebsites.net/api/v${version}`,
  updateTree: (treeId, payload) => {
    return axiosClient.put(`${baseUrl}/tree-management/tree/${treeId}`, payload);
  },
  deleteTree: (treeId) => {
    return axiosClient.delete(`${baseUrl}/tree-management/tree/${treeId}`);
  },
  addEditor: (treeId, payload) => {
    return axiosClient.post(
      `${baseUrl}/tree-management/tree/${treeId}/add-users-to-editor`,
      payload
    );
  },
  removeEditor: (treeId, payload) => {
    return axiosClient.post(
      `${baseUrl}/tree-management/tree/${treeId}/remove-users-from-editor`,
      payload
    );
  },
  getDetailPerson: (personId) => {
    return axiosClient.get(`${baseUrl}/person-management/person/${personId}`);
  },
};

export default apiTreeManagement;
