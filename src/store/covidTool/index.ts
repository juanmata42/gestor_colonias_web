/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';

export const covidToolSlice = createSlice({
  name: 'covidTool',
  initialState: INITIAL_STATE.CovidTool,
  reducers: {
    success: (state, action) => {
      const {
        summaryGeneral, summaryRegion, summaryActivity, summaryDate,
      } = action.payload;
      state.summaryGeneral = summaryGeneral;
      state.summaryRegion = summaryRegion;
      state.summaryDate = summaryDate;
      state.summaryActivity = summaryActivity;
    },
  },
});

export const covidToolActions = covidToolSlice.actions;

export default covidToolSlice.reducer;
