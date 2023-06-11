/* eslint-disable no-param-reassign */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import session, { SESSION_LOGOUT } from './session';
import i18n from './i18n';
import loading from './loading';
import initialState from './initialState';
import news from './news';
import covidTool from './covidTool';
import factories from './factories';
import healthIssuesTool from './healthIssuesTool';
import minorInjuriesTool from './minorInjuriesTool';
import iloTool from './iloTool';
import adminTool from './adminTool';
import apps from './apps';

const combinedReducer = combineReducers({
  session,
  i18n,
  loading,
  news,
  covidTool,
  factories,
  healthIssuesTool,
  minorInjuriesTool,
  iloTool,
  adminTool,
  apps,
});

//* RCT* --> This should not be any type, but typescript is not happy and me neither
// eslint-disable-next-line
const rootReducer = (state: any, action: any) => {
  if (action.type === SESSION_LOGOUT) {
    state = {
      ...initialState,
      session: {
        ...initialState.session,
        checked: true,
      },
    };
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
