import React, { ReactNode } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { ROUTE_PATH, ROUTE_TYPE_REDIRECT } from '../..';
import { LoginLang } from '../../../models/lang';
import { routes } from '../routes';

import './styles.scss';

interface AuthProps {
  //* RCT* --> This shouldn't be any type, but Typescript is not happy
  location: any;
  login: any;
  isAuthenticated: boolean;
  sessionError: ReactNode;
  literals: {
    login: LoginLang;
  }
}

const Auth: React.FC<AuthProps> = (props) => {
  const { location, isAuthenticated } = props;

  if (isAuthenticated) {
    const flagRedirect = location.state
                          && location.state.from !== ROUTE_PATH.BASE
                          && location.state.from !== ROUTE_PATH.LOGOUT;
    const redirectTo = (flagRedirect) ? location.state.from : ROUTE_PATH.MAIN;

    return (
      <Redirect to={{
        pathname: redirectTo,
        state: location.state,
      }}
      />
    );
  }

  //* RCT* --> route.component not sure it will work
  return (
    <Switch>
      {routes.map((route, index) => {
        switch (route.type) {
          case ROUTE_TYPE_REDIRECT:
            return (
              <Redirect key={index} from={route.from} to={route.to} exact={route.exact} />
            );

          default:
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={() => route.component && <route.component {...props} />}
              />
            );
        }
      })}
    </Switch>
  );
};

Auth.displayName = 'Auth';

export default Auth;
