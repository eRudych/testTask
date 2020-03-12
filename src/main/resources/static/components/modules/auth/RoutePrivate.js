import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import userRoutes from '../../../routes/user';

const RoutePrivate = props =>
  props.user.isAuthenticated ? (
    <Route {...props} component={props.component} />
  ) : (
    <Redirect to={userRoutes.login.path} />
  );

function routePrivateState(state) {
  return {
    user: state.user
  };
}

export default connect(routePrivateState, {})(RoutePrivate);
