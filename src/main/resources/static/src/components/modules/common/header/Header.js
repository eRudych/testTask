import React from 'react';

import Navbar from './nav/Navbar';
import Logo from '../../../../static/logo.png';

import './Header.scss';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={Logo} width="60px" height="60px" alt="logo" />
        <h3>Stats App</h3>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
