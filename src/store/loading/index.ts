/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const SHOW_LOADING = 'loading/show';
export const HIDE_LOADING = 'loading/hide';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState.loading,
  reducers: {
    show: (state) => {
      state.active = true;
    },
    hide: (state) => {
      state.active = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
