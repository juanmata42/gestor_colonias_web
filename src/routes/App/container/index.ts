import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { validateSession } from '../../../store/session/actions';
import AppComponent from '../components';
import { User } from '../../../models/user';

interface AppState {
  session: {
    authenticated: boolean;
    checked: boolean;
    user: User;
  }
}

function mapStateToProps(state: AppState) {
  return {
    isAuthenticated: state.session.authenticated,
    sessionChecked: state.session.checked,
    user: state.session.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    checkSession: bindActionCreators(validateSession, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
