import React from 'react';

import Header from '../header/Header';

const Layout = React.memo(({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
});

export default Layout;
