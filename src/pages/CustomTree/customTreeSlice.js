import _ from 'lodash';
import axios from 'axios';
import api from '../../utils/api';
import Utils from '../../utils/adapter';
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'customTree',
  initialState: {
    nodeDataArrayRedux: [],
    linkDataArrayReduxRedux: []
  },
  reducers: {
    updateNodeDataArrayRedux: (state, action) => {
      return {...state, nodeDataArrayRedux: action.payload}; 
    },
    updateLinkDataArrayRedux: (state, action) => {
      return {...state, linkDataArrayRedux: action.payload};
    },
  }
});

export const { updateNodeDataArrayRedux, updateLinkDataArrayRedux} = slice.actions;


export const fetchFamiyTreeById = (id) => async (dispatch) => {
  const rs = await axios.get(`${api.API}/tree-management/tree/${id}`);
  dispatch(updateNodeDataArrayRedux(Utils.parse(_.get(rs, 'data.people', []))));
  return Promise.resolve(rs);
}

export const selectNodeDataArrayRedux = state => state.custom_tree.nodeDataArrayRedux;
export const selectLinkDataArrayRedux = state => state.custom_tree.linkDataArrayRedux;
export const selectIt = state => {
  return state.custom_tree.it;
}

export default slice.reducer;