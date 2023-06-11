import Main from './Main';
import Auth from './Auth';
import Logout from './Logout';
import Error from './Error';
import ApiCalls from './ApiCalls';
import AlertsNews from './AlertsNews';
import ANContentViewer from './ANContentViewer';
import CovidTool from './CovidTool';
import HealthIssuesTool from './HealthIssuesTool';
import MinorInjuriesTool from './MinorInjuriesTool';
import iloTool from './ILOTool';
import AdminTool from './AdminTool';
import UserManagement from './UserManagement';
import CreateEditUser from './CreateEditUser';
import UserInfoDisplay from './UserInfoDisplay';
import Interventions from './InterventionsManagement';
import InterventionsCreateExamine from './InterventionCreateExamine';

export const ROUTE_TYPE_REDIRECT = 'redirect';
export const ROUTE_BASE_PATH = '/';

// app name for the route is in lowercase because thats how it comes from the backend in route_page

export const ROUTE_PATH = Object.freeze({
  BASE: ROUTE_BASE_PATH,
  MAIN: '/home',
  AUTH: '/auth',
  LOGOUT: '/logout',
  APICALLS: '/apicalls',
  ALERTSNEWS: '/alertsnews',
  HEALTH_ISSUES: '/healthStats',
  MINOR_INJURIES: '/minorInjuriesStats',
  COVID: '/covidStats',
  ERROR: '/error',
  ILO: '/ILO',
  ADMIN_TOOL: '/admin',
  PROFILE: '/profile',
});

export const routes = [
  {
    type: ROUTE_TYPE_REDIRECT,
    from: ROUTE_BASE_PATH,
    to: ROUTE_PATH.MAIN,
    exact: true,
  },
  {
    path: ROUTE_PATH.AUTH,
    component: Auth,
    exact: false,
    ignoreSession: true,
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
    path: ROUTE_PATH.LOGOUT,
    component: Logout,
    exact: false,
    ignoreSession: true,
  },
  {
    path: ROUTE_PATH.APICALLS,
    component: ApiCalls,
    exact: false,
    ignoreSession: true,
    header: true,
    footer: true,
  },
  {
    path: ROUTE_PATH.ALERTSNEWS,
    component: AlertsNews,
    exact: true,
    ignoreSession: true,
    header: true,
    footer: true,
  },
  {
    path: `${ROUTE_PATH.ALERTSNEWS}/:scope/:id`,
    component: ANContentViewer,
    exact: false,
    ignoreSession: true,
    header: true,
    footer: true,
  },
  {
    path: `${ROUTE_PATH.HEALTH_ISSUES}`,
    component: HealthIssuesTool,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.MINOR_INJURIES}`,
    component: MinorInjuriesTool,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ILO}`,
    component: iloTool,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.COVID}`,
    component: CovidTool,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}`,
    component: AdminTool,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/userManagement`,
    component: UserManagement,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/userManagement/userInfo/:name`,
    component: UserInfoDisplay,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/userManagement/edit/info/:name`,
    component: CreateEditUser,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/userManagement/edit/permissions/:name`,
    component: CreateEditUser,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/userManagement/create/info`,
    component: CreateEditUser,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/userManagement/create/permissions`,
    component: CreateEditUser,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/interventions`,
    component: Interventions,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/interventions/create`,
    component: InterventionsCreateExamine,
    exact: true,
    ignoreSession: false,
    header: true,
  },

  {
    path: `${ROUTE_PATH.ADMIN_TOOL}/interventions/examine/:date`,
    component: InterventionsCreateExamine,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.PROFILE}/personalInfo`,
    component: UserInfoDisplay,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.PROFILE}/personalInfo/edit`,
    component: CreateEditUser,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    path: `${ROUTE_PATH.PROFILE}/security`,
    component: CreateEditUser,
    exact: true,
    ignoreSession: false,
    header: true,
  },
  {
    type: ROUTE_TYPE_REDIRECT,
    from: '',
    to: `${ROUTE_PATH.ERROR}/404`,
    exact: false,
  },
];
