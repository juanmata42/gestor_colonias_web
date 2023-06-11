import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { lang } from '../../../models/lang';
import { User, EditUser } from '../../../models/user';
import UserInfoDisplay from '../components';
import { getAllAppsAction } from '../../../store/apps/actions';
import { Factory } from '../../../models/factory';
import { getFactoriesFromUserDataAction } from '../../../store/factories/action';

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
  adminTool: {
    userToEdit: EditUser,
  }
  apps: {
    appsArray: any[];
  }
  loading: {
    count: number;
  }
  factories: {
    list: Factory[];
  }
}

function mapStateToProps(state: State) {
  return {
    adminUser: state.session.user,
    literals: state.i18n.literals.adminTool,
    userToEdit: state.adminTool.userToEdit,
    appList: state.apps.appsArray,
    language: state.i18n.language,
    loading: state.loading.count,
    factories: state.factories.list,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getAllApps: bindActionCreators(getAllAppsAction, dispatch),
    getUserFactories: bindActionCreators(getFactoriesFromUserDataAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoDisplay));
