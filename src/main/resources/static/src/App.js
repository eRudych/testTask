import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from './routes';
import NotFound from './components/modules/common/not-found/NotFound';
import Layout from './components/modules/common/layout/Layout';
import RoutePrivate from './components/modules/auth/RoutePrivate';

import './App.scss';

const App = () => (
  <Layout>
    <Switch>
      {Object.values(routes).map(route =>
        route.auth ? (
          <RoutePrivate
            {...route}
            key={`${route.path}`}
            path={typeof route.path === 'function' ? route.path() : route.path}
          />
        ) : (
          <Route {...route} key={`${route.path}`} path={typeof route.path === 'function' ? route.path() : route.path} />
        )
      )}

      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default App;
