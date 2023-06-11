/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';

export const healthIssuesToolSlice = createSlice({
  name: 'healthIssuesTool',
  initialState: INITIAL_STATE.HealthIssuesTool,
  reducers: {
    success: (state, action) => {
      const {
        summaryGeneral, summaryRegion, summaryActivity, summaryDate, summaryGender,
      } = action.payload;
      state.summaryGeneral = summaryGeneral;
      state.summaryRegion = summaryRegion;
      state.summaryDate = summaryDate;
      state.summaryActivity = summaryActivity;
      state.summaryGender = summaryGender;
    },
  },
});

export const healthIssuesToolActions = healthIssuesToolSlice.actions;

export default healthIssuesToolSlice.reducer;
