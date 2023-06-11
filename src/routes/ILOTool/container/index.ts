import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { lang } from '../../../models/lang';
import { User } from '../../../models/user';
import { getIloDataAction } from '../../../store/iloTool/action';
import ILO from '../components';

interface State {
  session: {
    user: User
    authenticated: boolean;
    checked: boolean;
    error: string;
  }
  i18n: {
    language: string;
    literals: lang;
  }
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
  }
  factories: {
    list: [];
  }
}

function mapStateToProps(state: State) {
  return {
    user: state.session.user,
    literals: state.i18n.literals.iloTool,
    ilo: state.iloTool,
    factories: state.factories,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getData: bindActionCreators(getIloDataAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ILO));
