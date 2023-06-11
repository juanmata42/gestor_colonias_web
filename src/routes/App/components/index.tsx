/* eslint-disable react/function-component-definition */
import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Loading from '../../../components/Loading';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { routes, ROUTE_PATH, ROUTE_TYPE_REDIRECT } from '../..';

// *RCT* --> should not be unknown, but is the type that works the best
interface AppProps {
  isAuthenticated: boolean;
  sessionChecked: boolean;
  checkSession: unknown;
}

const App: React.FC<AppProps> = (props) => {
  const { isAuthenticated } = props;

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
                render={() => ((route.ignoreSession || isAuthenticated) ? (
                  <ErrorBoundary>
                    <section>
                      {route.header && <Header />}
                      <Loading />
                      {route.component && <route.component />}
                      {route.footer && <Footer />}
                    </section>
                  </ErrorBoundary>
                ) : (
                  <Redirect to={{
                    pathname: ROUTE_PATH.AUTH,
                    state: { from: window.location.pathname },
                  }}
                  />
                ))}
              />
            );
        }
      })}
    </Switch>
  );
};

App.displayName = 'App';

export default App;
