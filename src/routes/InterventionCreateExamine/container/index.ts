import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { lang } from '../../../models/lang';
import { User } from '../../../models/user';
import { Intervention } from '../../../models/intervention';
import InterventionCreateExamine from '../components';
import { Factory } from '../../../models/factory';
import { getFactoriesFromUserDataAction } from '../../../store/factories/action';
import { getInterventionsAction, createInterventionAction } from '../../../store/adminTool/actions';

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
        selectedIntervention: string;
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
    selectedIntervention: state.adminTool.selectedIntervention,
    interventions: state.adminTool.interventions,
    language: state.i18n.language,
    loading: state.loading.count,
    factories: state.factories.list,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    getInterventions: bindActionCreators(getInterventionsAction, dispatch),
    getUserFactories: bindActionCreators(getFactoriesFromUserDataAction, dispatch),
    createIntervention: bindActionCreators(createInterventionAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterventionCreateExamine));
