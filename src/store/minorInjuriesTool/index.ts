/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';

export const minorInjuriesToolSlice = createSlice({
  name: 'minorInjuries',
  initialState: INITIAL_STATE.MinorInjuriesTool,
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

export const minorInjuriesToolActions = minorInjuriesToolSlice.actions;

export default minorInjuriesToolSlice.reducer;
