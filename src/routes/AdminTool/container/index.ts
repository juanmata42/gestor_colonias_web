import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { lang } from '../../../models/lang';
import { User } from '../../../models/user';
import { App } from '../../../models/app';
import { getAllAppsAction } from '../../../store/apps/actions';
import AdminTool from '../components';

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
  apps: {
    appsArray: App[] | [];
  }
}

function mapStateToProps(state: State) {
  return {
    user: state.session.user,
    literals: state.i18n.literals.adminTool,
    apps: state.apps.appsArray,
  };
}
function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getAllApps: bindActionCreators(getAllAppsAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminTool));
