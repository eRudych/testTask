import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { routes } from '../../../../../routes';
import { logout } from '../../../user/api/actions';
import NavItem from './NavItem';

import './Navbar.scss';

function Navbar(props) {
  const { isAuthenticated } = props.user;
  const { pathname } = props.location;
  const { login, signup, home } = routes;

  const onLogoutClick = () => {
    props.logout();
    props.history.push(login.path);
  };

  return (
    <nav>
      {pathname !== '/' && isAuthenticated && <NavItem to={home.path}>Home</NavItem>}
      {pathname !== '/user/login' && !isAuthenticated && <NavItem to={login.path}>Login</NavItem>}
      {pathname !== '/user/signup' && <NavItem to={signup.path}>Signup</NavItem>}
      {isAuthenticated && <NavItem onClick={onLogoutClick}>Logout</NavItem>}
    </nav>
  );
}

function navbarState(state) {
  return {
    user: state.user
  };
}

export default connect(navbarState, { logout })(withRouter(Navbar));
