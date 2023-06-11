import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { lang } from '../../../models/lang';
import { User } from '../../../models/user';
import { Intervention } from '../../../models/intervention';
import { Factory } from '../../../models/factory';
import InterventionsManagement from '../components';
import {
  getInterventionsAction, createInterventionAction, deleteInterventionAction, selectInterventionAction,
} from '../../../store/adminTool/actions';
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
    interventions: Intervention[];
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
    interventions: state.adminTool.interventions,
    factories: state.factories.list,
    loading: state.loading.count,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getInterventions: bindActionCreators(getInterventionsAction, dispatch),
    createIntervention: bindActionCreators(createInterventionAction, dispatch),
    getUserFactories: bindActionCreators(getFactoriesFromUserDataAction, dispatch),
    deleteIntervention: bindActionCreators(deleteInterventionAction, dispatch),
    selectIntervention: bindActionCreators(selectInterventionAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterventionsManagement));
