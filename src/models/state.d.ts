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
  Apps: {
    appsArray: App[];
  },
  CovidTool: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryRegion: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryActivity: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryDate: Record<string, Record<string, number>>;
  },
  HealthIssuesTool: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryRegion: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryActivity: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryDate: Record<string, Record<string, number>>;
    summaryGender: Record<string, Record<string, Record<string, number>>>;
  },
  MinorInjuriesTool: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryRegion: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryActivity: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryDate: Record<string, Record<string, number>>;
    summaryGender: Record<string, Record<string, Record<string, number>>>;
  },
  iloTool: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryActivity: Record<string, Record<string, Record<string, number>>>;
    summaryAge: Record<string, Record<string, Record<string, number>>>;
    summaryWage: Record<string, Record<string, Record<string, number>>>;
    summaryOvertime: Record<string, Record<string, Record<string, number>>>;
    summaryAllowance: Record<string, Record<string, Record<string, number>>>;
    summaryCostCare: Record<string, Record<string, Record<string, number>>>;
    summaryDaysAbsence: Record<string, Record<string, Record<string, number>>>;
    summaryGender: Record<string, Record<string, Record<string, number>>>;
    summaryPaidAbsence: Record<string, Record<string, Record<string, number>>>;
    summaryFrequency: Record<string, Record<string, Record<string, number>>>;
    summaryTitle: Record<string, Record<string, Record<string, number>>>;
    summaryDate: Record<string, Record<string, number>>;
  },
  Factories: {
    list: any[],
  }
};
