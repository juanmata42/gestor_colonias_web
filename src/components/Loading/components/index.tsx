import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import './styles.scss';

const Loading: React.FC<{ isLoading: number}> = (props) => {
  const { isLoading } = props;
  return (
    <div className={`loader__container ${isLoading <= 0 ? 'loader__hidden' : ''}`}>
      <RotatingLines
        width='100'
        strokeColor='#c4c4c4'
        strokeWidth='1'
        animationDuration='2'
      />
    </div>
  );
};

export default Loading;
