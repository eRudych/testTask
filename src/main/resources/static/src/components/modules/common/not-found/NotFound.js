import React from 'react';

import Card from '../../../layout/card/Card';

import './NotFound.scss';

function NotFound() {
  return (
    <div className="not-found-page">
      <Card>
        <div className="not-found">
          <h1>404 Not Found</h1>
        </div>
      </Card>
    </div>
  );
}

export default NotFound;
