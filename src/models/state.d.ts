import { AlertNew } from './alertNew';
import { User, dependantUser } from './user';
import { App } from './app';
import { Intervention } from './intervention';

export type State = {
  session: {
    user: User;
    authenticated: boolean;
    checked: boolean;
    error: string;
  },
  adminTool: {
    error: string;
    userManagement: dependantUser[];
    userToEdit: User;
    interventions: Intervention[];
    selectedIntervention: id;
  },
  loading: {
    count: number
  },
  i18n: {
    language: string;
    literals: lang;
  },
  AlertNews: {
    localNews: AlertNew[];
    globalNews: AlertNew[];
  },
};
