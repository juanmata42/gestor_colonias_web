/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loading from './loading';
import literals from './literals';

const combinedReducer = combineReducers({
  loading,
  literals,
});

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
