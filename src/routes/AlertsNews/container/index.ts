import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { AlertNew } from '../../../models/alertNew';
import { lang } from '../../../models/lang';
import { User } from '../../../models/user';
import { getNewsAction } from '../../../store/news/actions';
import AlertsNews from '../components';

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
    news: {
      localNews: AlertNew[];
      globalNews: AlertNew[];
    }
}

function mapStateToProps(state: State) {
  return {
    user: state.session.user,
    literals: state.i18n.literals.mainpage,
    news: state.news,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getNews: bindActionCreators(getNewsAction, dispatch),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertsNews));
