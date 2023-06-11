import { connect } from 'react-redux';
import FooterComponent from '../components';

interface FooterProps {
  loading: {
    count: number;
  }
}

function mapStateToProps(state: FooterProps) {
  return {
    isLoading: state.loading.count,
  };
}

export default connect(mapStateToProps)(FooterComponent);
