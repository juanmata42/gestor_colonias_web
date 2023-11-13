/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getBrowserLanguage } from 'utils/language';
import literals from 'literals';

const USER_LANG = getBrowserLanguage();

const filterliterals = (lang: string) => {
  if (lang === 'ES') {
    return literals.ES;
  }
  if (lang === 'BN') {
    return literals.EN;
  }
  return literals.EN;
};

const INITIAL_LANG_CONF = {
  language: USER_LANG,
  literals: filterliterals(USER_LANG),
};

export const literalsSlice = createSlice({
  name: 'language',
  initialState: INITIAL_LANG_CONF,
  reducers: {
    set: (state, { payload: lang }) => {
      state.language = lang;
      state.literals = literals.EN;
    },
  },
});

export const literalsActions = literalsSlice.actions;

export default literalsSlice.reducer;
