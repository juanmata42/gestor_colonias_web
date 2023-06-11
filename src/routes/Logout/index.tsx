import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../store/session/actions';
import { ROUTE_PATH } from '..';

interface State {
  session: {
    authenticated: boolean;
  }
}

function Logout() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: State) => state.session.authenticated);

  dispatch(logoutAction());

  if (!isAuthenticated) {
    return (
      <Redirect to={ROUTE_PATH.BASE} />
    );
  }

  return <div />;
}

export default Logout;
