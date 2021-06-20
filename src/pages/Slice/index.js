import api from "../../utils/api";
import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "index",
  initialState: {
    currentTree: null,
    creatingTree: false,
  },
  reducers: {
    fetchTree: (state, action) => {
      return { ...state, tree: action.payload };
    },
    createTree: (state) => {
      return { ...state, creatingTree: true };
    },
    createTreeSuccess: (state, action) => {
      return { ...state, creatingTree: false, tree: action.payload };
    },
    createTreeFail: (state) => {
      return { ...state, creatingTree: false };
    },
  },
});

// export const { } =
//   slice.actions;

export const createTree = (tree) => async () => {
  const response = await api.createTree(tree);
  if (response.data) {
    return response.data;
  }
  return false;
};

export const getEditorTree = (treeId) => async () => {
  const response = await api.getEditorTree(treeId);
  if (response.data) return response.data;
  return false;
};

export const selectTree = (state) => state.tree;

export default slice.reducer;
