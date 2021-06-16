import _ from "lodash";
import api from "../../utils/api";
import axios from "axios";
import Utils from "../../utils/adapter";
import { createSlice } from "@reduxjs/toolkit";

const API = api.baseUrl;

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
  const rs = await api.fetchFamilyTreeById(id);
  dispatch(updateNodeDataArrayRedux(_.get(rs, 'data.data')));
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
  const rs = await api.updateFamilyTree(treeId, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const deleteFamilyTree = (treeId) => async (dispatch) => {
  const rs = await api.deleteFamilyTree(treeId);
  if (rs) {
    return rs;
  }
  return false;
}

export const createParent = (personId, payload) => async (dispatch) => {
  const rs = await api.createParent(personId, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const createSpouse = (personId, payload) => async (dispatch) => {
  const rs = await api.createSpouse(personId, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const getPerson = (personId) => async (dispatch) => {
  const rs = await api.getPerson(personId);
  if (rs) {
    return rs;
  }
  return false;
}

export const  getChildOfPerson = (personId) => async (dispatch) => {
  const rs = await api.getChildOfPerson(personId);
  if (rs) {
    return rs;
  }
  return false;
}

export const updatePerson = (personId, payload) => async (dispatch) => {
  const rs = await api.updatePerson(personId, payload);
  if (rs) {
    return rs;
  }
  return false;
}

export const deletePerson = (personId) => async (dispatch) => {
  try {
    const rs = await api.deletePerson(personId);
    if (rs.data) return rs;
    return false;
  } catch (error) {
    return false;
  }
}

export const createChild = (payload) => async (dispatch) => {
  const rs = await api.createChild(payload);
  if (rs) return rs;
  return false;
}

export const uploadImage = (file) => async (dispatch) => {
  const rs = await api.uploadImage(file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
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
