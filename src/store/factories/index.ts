/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';

export const factoriesSlice = createSlice({
  name: 'factories',
  initialState: INITIAL_STATE.Factories,
  reducers: {
    success: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const factoriesActions = factoriesSlice.actions;

export default factoriesSlice.reducer;
