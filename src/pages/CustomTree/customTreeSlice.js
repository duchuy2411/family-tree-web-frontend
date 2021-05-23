import _ from "lodash";
import api from "../../utils/api";
import axios from "axios";
import Utils from "../../utils/adapter";
import { createSlice } from "@reduxjs/toolkit";

const { API } = api;

export const slice = createSlice({
  name: "customTree",
  initialState: {
    nodeDataArrayRedux: [],
    linkDataArrayReduxRedux: [],
  },
  reducers: {
    updateNodeDataArrayRedux: (state, action) => {
      return { ...state, nodeDataArrayRedux: action.payload };
    },
    updateLinkDataArrayRedux: (state, action) => {
      return { ...state, linkDataArrayRedux: action.payload };
    },
  },
});

export const { updateNodeDataArrayRedux, updateLinkDataArrayRedux } =
  slice.actions;

export const fetchTree = (id) => async (dispatch) => {
  // const rs = await axios.get(`${api.API}/tree-management/tree/${id}`);
  const rs = await api.fetchFamilyTreeById(id);
  dispatch(updateNodeDataArrayRedux(Utils.parse(_.get(rs, "data.people", []))));
  return Promise.resolve(rs);
};

export const createFamilyTree = (payload) => async (dispatch) => {
  const rs = await axios.post(`${API}/tree-management/tree`, payload);
  if (rs) {
    dispatch(updateNodeDataArrayRedux(Utils.parse(_.get(rs, 'data.people', []))));
  }
  return rs;
}

export const updateFamilyTree = (treeId, payload) => async (dispatch) => {
  const rs = await axios.put(`${API}/tree-management/tree/${treeId}`, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const deleteFamilyTree = (treeId) => async (dispatch) => {
  const rs = await axios.delete(`${API}/tree-managemnet/tree/${treeId}`);
  if (rs) {
    return rs;
  }
  return false;
}

export const createParent = (personId, payload) => async (dispatch) => {
  const rs = await axios.post(`${API}/person-management/person/${personId}/parent`, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const createSpouse = (personId, payload) => async (dispatch) => {
  const rs = await axios.post(`${API}/person-management/person/${personId}/spouse`, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const getPerson = (personId) => async (dispatch) => {
  const rs = await axios.get(`${API}/person-management/person/${personId}`);
  if (rs) {
    return rs;
  }
  return false;
}

export const  getChildOfPerson = (personId) => async (dispatch) => {
  const rs = await axios.get(`${API}/person-management/person/${personId}/`);
  if (rs) {
    return rs;
  }
  return false;
}

export const updatePerson = (personId, payload) => async (dispatch) => {
  const rs = await axios.put(`${API}/person-management/person/${personId}`, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const deletePerson = (personId) => async (dispatch) => {
  const rs = await axios.delete(`${API}/person-management/person/${personId}`);
  if (rs) {
    return rs;
  }
  return false;
}

export const createChild = (personId, payload) => async (dispatch) => {
  const rs = await axios.post(`${API}/person-management/person/${personId}/child`, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const uploadImage = (file) => async (dispatch) => {
  const rs = await axios.post(`${API}/file-upload/image`, { File: file });
  if (rs.data) {
    return rs.data;
  }
  return false;
}

export const selectNodeDataArrayRedux = state => state.custom_tree.nodeDataArrayRedux;
export const selectLinkDataArrayRedux = state => state.custom_tree.linkDataArrayRedux;
export const selectIt = state => {
  return state.custom_tree.it;
};

export default slice.reducer;
