import Login from './components/Login';

export const ROUTE_BASE_PATH = '/auth';
export const ROUTE_TYPE_REDIRECT = 'redirect';

export const LOGIN_ROUTE_PATH = Object.freeze({
  LOGIN: `${ROUTE_BASE_PATH}/login`,
});

export const routes = [
  {
    type: ROUTE_TYPE_REDIRECT,
    from: ROUTE_BASE_PATH,
    to: LOGIN_ROUTE_PATH.LOGIN,
    exact: true,
  },
  {
    path: LOGIN_ROUTE_PATH.LOGIN,
    component: Login,
    exact: true,
  },
  {
    type: ROUTE_TYPE_REDIRECT,
    from: '',
    to: LOGIN_ROUTE_PATH.LOGIN,
    exact: false,
  },
];
