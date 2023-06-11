import { connect } from 'react-redux';
import HeaderComponent from '../components';
import { lang } from '../../../models/lang';
import { User } from '../../../models/user';

interface HeaderProps {
  loading: {
    count: number;
  },
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

function mapStateToProps(state: HeaderProps) {
  return {
    isLoading: state.loading.count,
    user: state.session.user,
    literals: state.i18n.literals.mainpage,
  };
}

export default connect(mapStateToProps)(HeaderComponent);
