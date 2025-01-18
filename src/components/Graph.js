import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = ({ data }) => {
  const chartData = {
    labels: data.map(item => item['Mail Date']),
    datasets: [
      {
        label: 'Net Orders',
        data: data.map(item => item['Net Orders']),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Graph;
