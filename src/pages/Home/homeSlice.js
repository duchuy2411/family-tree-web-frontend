import _ from "lodash";
import api from "../../utils/api";
import { createSlice } from "@reduxjs/toolkit";
import swal from 'sweetalert';

const API = api.baseUrl;

export const slice = createSlice({
  name: "managementTree",
  initialState: {
    trees: [],
    tree: {},
    person: {},
    isFetchingPerson: false
  },
  reducers: {
    SET_TREES_ARRAY: (state, action) => {
      return { ...state, trees: action.payload };
    },
    SET_CURRENT_TREE: (state, action) => {
      return { ...state, tree: action.payload };
    },
    FETCH_CURRENT_PERSON: (state) => {
      return { ...state, isFetchingPerson: true };
    },
    FETCH_CURRENT_PERSON_SUCCESS: (state, action) => {
      return { ...state, person: action.payload, isFetchingPerson: false };
    },
    FETCH_CURRENT_PERSON_FAIL: (state) => {
      return { ...state, isFetchingPerson: false };
    },
    REFRESH_CURRENT_PERSON: (state) => {
      return { ...state, person: {} }; 
    }
  },
});

export const {
  SET_TREES_ARRAY, SET_CURRENT_TREE, FETCH_CURRENT_PERSON, FETCH_CURRENT_PERSON_SUCCESS, FETCH_CURRENT_PERSON_FAIL, REFRESH_CURRENT_PERSON
  } = slice.actions;

export const deleteTree =  (treeId) => async (dispatch) => {
  const rs = await api.apiTreeManagement.deleteTree(treeId);
  if (rs.status === 200) {
    swal("Delete success fully!!", {
      icon: "success",
    });
    return true;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
}

export const updateTree = (treeId, payload) => async dispatch => {
  const rs = await api.apiTreeManagement.updateTree(treeId, payload);
  if (rs.status === 200) {
    swal("Update success fully!!", {
      icon: "success",
    });
    return true;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
}

export const addEditor = (treeId, payload) => async dispatch => {
  const rs = await api.apiTreeManagement.addEditor(treeId, payload);
  if (rs.status === 200) {
    swal("Update success fully!!", {
      icon: "success",
    });
    return true;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
}

export const removeEditor = (treeId, payload) => async dispatch => {
  const rs = await api.apiTreeManagement.removeEditor(treeId, payload);
  if (rs.status === 200) {
    swal("Update success fully!!", {
      icon: "success",
    });
    return true;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
}

export const getDetailPerson = (personId) => async dispatch => {
  dispatch(FETCH_CURRENT_PERSON());
  const rs = await api.apiTreeManagement.getDetailPerson(personId);
  if (rs.status === 200) {
    const data = _.get(rs.data, 'data', {})
    dispatch(FETCH_CURRENT_PERSON_SUCCESS(data));
    return data;
  }
  dispatch(FETCH_CURRENT_PERSON_FAIL())
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
}

export const fetchTreesAndSetCurrent = (treeId) => async dispatch => {
  const rs = await api.getTreeList();
  if (rs.status === 200) {
    const data = _.get(rs.data, 'data', []);
    console.log(data, treeId);
    dispatch(SET_TREES_ARRAY(data));
    const getCur = _.find(data, ele => `${ele.id}` === `${treeId}`);
    console.log(getCur);
    dispatch(SET_CURRENT_TREE(getCur));
  }
  return false;
}

export const selectTrees = state => state.managementTree.trees;
export const selectTree = state => state.managementTree.tree;
export const selectPerson = state => state.managementTree.person;
export const selectFetchingCurrent = state => state.managementTree.isFetchingPerson;

export default slice.reducer;
