/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';

export const iloToolSlice = createSlice({
  name: 'ilo',
  initialState: INITIAL_STATE.iloTool,
  reducers: {
    success: (state, action) => {
      const {
        summaryGeneral, summaryActivity, summaryAge, summaryWage, summaryOvertime, summaryAllowance, summaryCostCare,
        summaryDaysAbsence, summaryGender, summaryPaidAbsence, summaryTitle, summaryDate, summaryFrequency,
      } = action.payload;
      state.summaryGeneral = summaryGeneral;
      state.summaryActivity = summaryActivity;
      state.summaryAge = summaryAge;
      state.summaryWage = summaryWage;
      state.summaryOvertime = summaryOvertime;
      state.summaryAllowance = summaryAllowance;
      state.summaryCostCare = summaryCostCare;
      state.summaryDaysAbsence = summaryDaysAbsence;
      state.summaryGender = summaryGender;
      state.summaryPaidAbsence = summaryPaidAbsence;
      state.summaryFrequency = summaryFrequency;
      state.summaryTitle = summaryTitle;
      state.summaryDate = summaryDate;
    },
  },
});

export const iloToolActions = iloToolSlice.actions;

export default iloToolSlice.reducer;
