import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { lang } from '../../../models/lang';
import { User } from '../../../models/user';
import { getMinorInjuriesDataAction } from '../../../store/minorInjuriesTool/action';
import MinorInjuries from '../components';

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
  minorInjuriesTool: {
    summaryGeneral: Record<string, Record<string, Record<string, number>>>;
    summaryRegion: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryActivity: Record<string, Record<string, Record<string, Record<string, number>>>>;
    summaryDate: Record<string, Record<string, number>>;
    summaryGender: Record<string, Record<string, Record<string, number>>>;
  }
  factories: {
    list: [],
  }
}

function mapStateToProps(state: State) {
  return {
    user: state.session.user,
    literals: state.i18n.literals.minorInjuriesTool,
    minorInjuries: state.minorInjuriesTool,
    factories: state.factories,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getData: bindActionCreators(getMinorInjuriesDataAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MinorInjuries));
