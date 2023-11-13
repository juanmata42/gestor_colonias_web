import React from 'react';
import { State } from 'models/state';
import { useSelector } from 'react-redux';

import './MainStyles.scss';

const Main: React.FC = () => {
  /* how to bring redux state into component const literals = useSelector((state: State) => state.literals.literals.notFound); */
  /* const loadingState = useSelector((state: State) => state.loading); */
  const literals = useSelector((state: State) => state.literals.literals.notFound);
  console.log(literals);
  return (
    <div className='main'>
      <h1>READY SET GO!</h1>
    </div>
  );
};

Main.displayName = 'Main';

export default Main;
