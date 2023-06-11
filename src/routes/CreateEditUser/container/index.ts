import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { lang } from '../../../models/lang';
import { User, EditUser } from '../../../models/user';
import CreateEditUser from '../components';
import {
  createUserAction, editUserAction, getAllUsersAction, editInCreationUserAction,
} from '../../../store/adminTool/actions';
import { getCurrentUserAction, updateCurrentUserAction } from '../../../store/session/actions';
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
    createUser: bindActionCreators(createUserAction, dispatch),
    editUser: bindActionCreators(editUserAction, dispatch),
    getCurrentUser: bindActionCreators(getCurrentUserAction, dispatch),
    getAllUsers: bindActionCreators(getAllUsersAction, dispatch),
    updateCurrentUser: bindActionCreators(updateCurrentUserAction, dispatch),
    getAllApps: bindActionCreators(getAllAppsAction, dispatch),
    editInCreationUser: bindActionCreators(editInCreationUserAction, dispatch),
    getUserFactories: bindActionCreators(getFactoriesFromUserDataAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEditUser));
