import _ from "lodash";
import api from "../../utils/api";
import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";
import Permission from "../../utils/permission";

export const slice = createSlice({
  name: "managementTree",
  initialState: {
    trees: [],
    tree: {},
    person: {},
    isFetchList: false,
    isFetchingPerson: false,
    treePermission: [],
  },
  reducers: {
    GET_TREE: (state) => {
      return { ...state, isFetchList: true };
    },
    GET_TREE_SUCCESS: (state, action) => {
      return { ...state, isFetchList: false, trees: action.payload };
    },
    GET_TREE_FAIL: (state) => {
      return { ...state, isFetchList: false };
    },
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
    },
    UPDATE_CURRENT_TREE: (state, action) => {
      const { name, description, publicMode } = action.payload;
      return { ...state, tree: { ...state.tree, name, description, publicMode } };
    },
    UPDATE_EDITORS: (state, action) => {
      const { owner, editors } = action.payload;
      owner.username = _.get(owner, "userName", "");
      const mapname = _.map(editors, (ele) => ({ ...ele, username: _.get(ele, "userName", "") }));
      return { ...state, tree: { ...state.tree, owner, editors: mapname } };
    },
    REMOVE_TREE: (state, action) => {
      const id = action.payload;
      return { ...state, trees: _.filter(state.trees, ele => `${ele.id}` !== `${id}`) };
    }
  },
});

export const {
  SET_TREES_ARRAY,
  SET_CURRENT_TREE,
  FETCH_CURRENT_PERSON,
  FETCH_CURRENT_PERSON_SUCCESS,
  FETCH_CURRENT_PERSON_FAIL,
  REFRESH_CURRENT_PERSON,
  GET_TREE,
  GET_TREE_SUCCESS,
  GET_TREE_FAIL,
  UPDATE_CURRENT_TREE,
  UPDATE_EDITORS,
  REMOVE_TREE
} = slice.actions;

export const getTreeList = () => async (dispatch) => {
  dispatch(GET_TREE());
  const rs = await api.getTreeList();
  if (rs.status === 200) {
    const treeList = _.get(rs.data, "data", []);
    console.log(treeList);
    Permission.mapPermission([...treeList]);
    dispatch(GET_TREE_SUCCESS(treeList));
    return true;
  }
  dispatch(GET_TREE_FAIL());
  return false;
};

export const getTreesPublic = () => async (dispatch) => {
  dispatch(GET_TREE());
  const rs = await api.getTreesPublic();
  if (rs.status === 200) {
    dispatch(GET_TREE_SUCCESS(_.get(rs.data, "data", [])));
    return true;
  }
  dispatch(GET_TREE_FAIL());
  return false;
};

export const deleteTree = (treeId) => async (dispatch) => {
  const rs = await api.apiTreeManagement.deleteTree(treeId);
  if (rs.status === 200) {
    dispatch(REMOVE_TREE(treeId));
    swal("Delete success fully!!", {
      icon: "success",
    });
    return true;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
};

export const updateTree = (treeId, payload) => async (dispatch) => {
  const rs = await api.apiTreeManagement.updateTree(treeId, payload);
  if (rs.status === 200) {
    const mapData = _.get(rs, "data.data");
    dispatch(
      UPDATE_CURRENT_TREE({
        name: mapData.name,
        description: mapData.description,
        publicMode: payload.publicMode,
      })
    );
    swal("Update success fully!!", {
      icon: "success",
    });
    return true;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
};

export const addEditor = (treeId, payload) => async (dispatch) => {
  const rs = await api.apiTreeManagement.addEditor(treeId, payload);
  if (rs.status === 200) {
    swal("Update success fully!!", {
      icon: "success",
    });
    const getEdit = await api.apiTreeManagement.getAllEditors(treeId);
    if (getEdit.status === 200) {
      dispatch(UPDATE_EDITORS(_.get(getEdit, "data.data")));
    }
    return true;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
};

export const removeEditor = (treeId, payload) => async (dispatch) => {
  const rs = await api.apiTreeManagement.removeEditor(treeId, payload);
  if (rs.status === 200) {
    swal("Update success fully!!", {
      icon: "success",
    });
    const getEdit = await api.apiTreeManagement.getAllEditors(treeId);
    if (getEdit.status === 200) {
      dispatch(UPDATE_EDITORS(_.get(getEdit, "data.data")));
    }
    return true;
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
};

export const getDetailPerson = (personId) => async (dispatch) => {
  dispatch(FETCH_CURRENT_PERSON());
  const rs = await api.apiTreeManagement.getDetailPerson(personId);
  if (rs.status === 200) {
    const data = _.get(rs.data, "data", {});
    dispatch(FETCH_CURRENT_PERSON_SUCCESS(data));
    return data;
  }
  dispatch(FETCH_CURRENT_PERSON_FAIL());
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
};

export const fetchTreesAndSetCurrent = (treeId) => async (dispatch) => {
  const rs = await api.getListByKeyword("");
  if (rs.status === 200) {
    const data = _.get(rs.data, "data", []);
    dispatch(SET_TREES_ARRAY(data));
    const getCur = _.find(data, (ele) => `${ele.id}` === `${treeId}`);
    dispatch(SET_CURRENT_TREE(getCur));
  }
  return false;
};

export const importTree = (file) => async () => {
  const rs = await api.importTree(file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (rs.status === 200) {
    return _.get(rs.data, "data");
  }
  swal(_.get(rs, "title", "Something wrong!!"));
  return false;
};

export const getListByKeyword = (key) => async (dispatch) => {
  dispatch(GET_TREE());
  const rs = await api.getListByKeyword(key);
  if (rs.status === 200) {
    dispatch(GET_TREE_SUCCESS(_.get(rs.data, "data")));
    return _.get(rs.data, "data");
  }
  dispatch(GET_TREE_FAIL());
  return false;
};

export const selectTrees = (state) => state.managementTree.trees;
export const selectTree = (state) => state.managementTree.tree;
export const selectPerson = (state) => state.managementTree.person;
export const selectFetching = (state) => state.managementTree.isFetchList;
export const selectFetchingCurrent = (state) => state.managementTree.isFetchingPerson;

export default slice.reducer;
