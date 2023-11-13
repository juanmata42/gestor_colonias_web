import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { routes, ROUTE_TYPE_REDIRECT, ROUTE_PATH } from 'routes';
import Loading from 'components/Loading/Loading';

const App: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        switch (route.type) {
          case ROUTE_TYPE_REDIRECT:
            return (
              <Route
                key={index}
                path={route.from}
                element={<Navigate to={route.to} replace />}
              />
            );

          default:
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  (
                    <ErrorBoundary>
                      <section>
                        <Loading />
                        {route.component && <route.component />}
                      </section>
                    </ErrorBoundary>
                  )
                }
              />
            );
        }
      })}
      <Route path='*' element={<Navigate to={`${ROUTE_PATH.ERROR}/404`} replace />} />
    </Routes>
  );
};

App.displayName = 'App';

export default App;
