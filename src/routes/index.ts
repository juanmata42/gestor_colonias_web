import Main from './Main/Main';
import Error from './Error/Error';

export const ROUTE_TYPE_REDIRECT = 'redirect';
export const ROUTE_BASE_PATH = '/';

export const ROUTE_PATH = Object.freeze({
  BASE: ROUTE_BASE_PATH,
  MAIN: '/home',
  ERROR: '/error',
});

export const routes = [
  {
    type: ROUTE_TYPE_REDIRECT,
    from: ROUTE_BASE_PATH,
    to: ROUTE_PATH.MAIN,
    exact: true,
  },
  {
    path: ROUTE_PATH.MAIN,
    component: Main,
    exact: false,
    ignoreSession: false,
    header: true,
    footer: true,
  },
  {
    path: `${ROUTE_PATH.ERROR}/:status`,
    component: Error,
    exact: false,
    ignoreSession: true,
  },
  {
    type: ROUTE_TYPE_REDIRECT,
    from: '',
    to: `${ROUTE_PATH.ERROR}/404`,
    exact: false,
  },
];
