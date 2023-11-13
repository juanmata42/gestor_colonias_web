import React from 'react';
import { connect } from 'react-redux';
import CatLoader from 'assets/cat-tail-loader.gif';
import './LoadingStyles.scss';

const Loading: React.FC<{ isLoading: number}> = (props) => {
  const { isLoading } = props;
  return (
    <div className={`loader__container ${isLoading <= 0 ? 'loader__hidden' : ''}`}>
      <img src={CatLoader} alt="loading" className="loader__image" />
    </div>
  );
};

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

export default connect(mapStateToProps)(Loading);
