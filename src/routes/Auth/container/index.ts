import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { loginAction } from '../../../store/session/actions';
import AuthComponent from '../components';
import { LoginLang } from '../../../models/lang';

//* RCT* --> auth should not be any type, but usage not found
type ContainerAuthProps = {
  session: {
    authenticated: boolean;
    error: ReactNode
  };
  i18n: {
    literals: {
      auth: {
        login: LoginLang;
      }
    }
  }
}

function mapStateToProps(state: ContainerAuthProps) {
  return {
    isAuthenticated: state.session.authenticated,
    sessionError: state.session.error,
    literals: state.i18n.literals.auth,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    login: bindActionCreators(loginAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthComponent));
