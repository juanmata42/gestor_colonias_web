import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { lang } from '../../../models/lang';
import { User, dependantUser } from '../../../models/user';
import UserManagement from '../components';
import { getAllUsersAction, deleteUserAction, getUserByIDAction } from '../../../store/adminTool/actions';

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
    userManagement: dependantUser[];
  }
}

function mapStateToProps(state: State) {
  return {
    adminUser: state.session.user,
    literals: state.i18n.literals.adminTool,
    userManagement: state.adminTool.userManagement,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getAllUsers: bindActionCreators(getAllUsersAction, dispatch),
    deleteUser: bindActionCreators(deleteUserAction, dispatch),
    getUserByID: bindActionCreators(getUserByIDAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManagement));
