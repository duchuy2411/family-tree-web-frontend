import _ from "lodash";
import api from "../../utils/api";
import Utils from "../../utils/adapter";
import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";
import axiosClient from "api";

const API = api.baseUrl;

export const slice = createSlice({
  name: "customTree",
  initialState: {
    nodeDataArrayRedux: [],
    linkDataArrayReduxRedux: [],
    isLoading: false,
  },
  reducers: {
    updateNodeDataArrayRedux: (state, action) => {
      return { ...state, nodeDataArrayRedux: action.payload };
    },
    updateLinkDataArrayRedux: (state, action) => {
      return { ...state, linkDataArrayRedux: action.payload };
    },
    LOADING: (state, action) => {
      return { ...state, isLoading: true };
    },
    RESPONSE_API: (state, action) => {
      return { ...state, isLoading: false };
    }
  },
});

export const { updateNodeDataArrayRedux, updateLinkDataArrayRedux, LOADING, RESPONSE_API } = slice.actions;

export const fetchTree = (id) => async (dispatch) => {
  const rs = await api.fetchFamilyTreeById(id);
  dispatch(updateNodeDataArrayRedux(_.get(rs, "data.data")));
  return Promise.resolve(rs);
};

export const createFamilyTree = (payload) => async (dispatch) => {
  const rs = await axiosClient.post(`${API}/tree-management/tree`, payload);
  if (rs) {
    dispatch(updateNodeDataArrayRedux(Utils.parse(_.get(rs, "data.people", []))));
  }
  return rs;
};

export const updateFamilyTree = (treeId, payload) => async () => {
  const rs = await api.updateFamilyTree(treeId, payload);
  if (rs) {
    return rs;
  }
  return false;
};

export const deleteFamilyTree = (treeId) => async () => {
  const rs = await api.deleteFamilyTree(treeId);
  if (rs) {
    return rs;
  }
  return false;
};

export const createParent = (personId, payload) => async (dispatch) => {
  dispatch(LOADING());
  const rs = await api.createParent(personId, payload);
  if (rs) {
    dispatch(RESPONSE_API());
    return rs;
  }
  dispatch(RESPONSE_API());
  return false;
};

export const createSpouse = (personId, payload) => async (dispatch) => {
  dispatch(LOADING());
  const rs = await api.createSpouse(personId, payload);
  if (rs) {
    dispatch(RESPONSE_API());
    return rs;
  }
  dispatch(RESPONSE_API());
  return false;
};

export const getPerson = (personId) => async () => {
  const rs = await api.getPerson(personId);
  if (rs) {
    return rs;
  }
  return false;
};

export const getChildOfPerson = (personId) => async () => {
  const rs = await api.getChildOfPerson(personId);
  if (rs) {
    return rs;
  }
  return false;
};

export const updatePerson = (personId, payload) => async (dispatch) => {
  dispatch(LOADING());
  const rs = await api.updatePerson(personId, payload);
  if (rs) {
    dispatch(RESPONSE_API());
    return rs;
  }
  return false;
};

export const deletePerson = (personId) => async () => {
  try {
    const rs = await api.deletePerson(personId);
    if (rs.data) return rs;
    return false;
  } catch (error) {
    return false;
  }
};

export const createChild = (payload) => async (dispatch) => {
  dispatch(LOADING());
  const rs = await api.createChild(payload);
  if (rs) {
    dispatch(RESPONSE_API());
    return rs;
  }
  dispatch(RESPONSE_API());
  return false;
};

export const uploadImage = (file) => async () => {
  const rs = await api.uploadImage(file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (rs.data) {
    return rs.data;
  }
  return false;
};

export const exportJSON = (treeId) => async () => {
  const rs = await api.exportJSON(treeId);
  if (rs.status === 200) {
    const json = _.get(rs, "data");
    return json;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
};

export const getListConnectUser = () => async (dispatch) => {
  const rs = await api.getListConnectUser({});
  if (rs.status === 200) {
    const data = _.get(rs.data, "data");
    return data;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
};

export const selectNodeDataArrayRedux = (state) => state.custom_tree.nodeDataArrayRedux;
export const selectLinkDataArrayRedux = (state) => state.custom_tree.linkDataArrayRedux;
export const isLoading = (state) => state.custom_tree.isLoading;
export const selectIt = (state) => {
  return state.custom_tree.it;
};

export default slice.reducer;
