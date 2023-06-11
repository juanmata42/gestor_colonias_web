import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lang } from '../../../models/lang';
import ErrorComponent from '../components';

//* RCT* --> should not be any type
interface State {
  i18n: {
    literals: lang
  }
}

function mapStateToProps(state: State) {
  return {
    literals: state.i18n.literals.notFound,
  };
}

export default withRouter(connect(mapStateToProps/* , mapDispatchToProps */)(ErrorComponent));
