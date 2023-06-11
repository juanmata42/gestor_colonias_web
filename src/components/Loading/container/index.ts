import { connect } from 'react-redux';
import LoadingComponent from '../components';

interface LoadingState {
  loading: {
    count: number
  }
}

function mapStateToProps(state: LoadingState) {
  return {
    isLoading: state.loading.count,
  };
}

export default connect(mapStateToProps)(LoadingComponent);
