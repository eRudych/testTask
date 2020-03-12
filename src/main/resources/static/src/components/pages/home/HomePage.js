import React from 'react';

import Chart from '../../modules/chart/Chart';
import ChartForm from '../../modules/chart/ChartForm';

import './HomePage.scss';

function HomePage() {
  return (
    <div className="home-page">
      <Chart />
      <ChartForm />
    </div>
  );
}

export default HomePage;
