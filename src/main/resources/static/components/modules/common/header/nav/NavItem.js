import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function NavItem(props) {
  const {children, to, onClick} = props;

  return (
    <div className="link-container">
      <Link onClick={onClick} to={to}>{children}</Link>
    </div>
  );
}

export default withRouter(NavItem);
