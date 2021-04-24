import { configureStore } from '@reduxjs/toolkit';
import customTreeReducer from '../pages/CustomTree/customTreeSlice';

export default configureStore({
  reducer: {
    custom_tree: customTreeReducer,
  }
})