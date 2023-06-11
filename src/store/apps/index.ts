/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';

export const appsSlice = createSlice({
  name: 'Apps',
  initialState: INITIAL_STATE.Apps,
  reducers: {
    success: (state, action) => {
      state.appsArray = action.payload;
    },
  },
});

export const appsActions = appsSlice.actions;

export default appsSlice.reducer;
