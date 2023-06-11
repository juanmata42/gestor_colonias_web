import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lang } from '../../../models/lang';
import { User } from '../../../models/user';
import ApiCalls from '../components';

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
}

function mapStateToProps(state: State) {
  return {
    user: state.session.user,
    literals: state.i18n.literals.mainpage,
  };
}

export default withRouter(connect(mapStateToProps)(ApiCalls));
