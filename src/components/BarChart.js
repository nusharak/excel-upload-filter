import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { Grid, Typography } from '@mui/material';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = ({ filteredData }) => {
  const companyData = filteredData.reduce((acc, item) => {
    const client = item.Client;
    if (!acc[client]) {
      acc[client] = { totalCost: 0, totalSales: 0, netPL: 0, refunds: 0 };
    }
    acc[client].totalCost += item[' Total Cost '] || 0;
    acc[client].totalSales += item[' Gross Sales '] || 0;
    acc[client].netPL += item['Net P/L'] || 0;
    acc[client].refunds += item[' Refunds '] || 0;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(companyData),
    datasets: [
      {
        label: 'Cost',
        data: Object.values(companyData).map(data => data.totalCost),
        backgroundColor: '#FF5733', // Color for Cost
        borderColor: '#FF5733',
        borderWidth: 1,
      },
      {
        label: 'Sales',
        data: Object.values(companyData).map(data => data.totalSales),
        backgroundColor: '#33FF57', // Color for Sales
        borderColor: '#33FF57',
        borderWidth: 1,
      },
      {
        label: 'Net P/L',
        data: Object.values(companyData).map(data => data.netPL),
        backgroundColor: '#3357FF', // Color for Net P/L
        borderColor: '#3357FF',
        borderWidth: 1,
      },
      {
        label: 'Refunds',
        data: Object.values(companyData).map(data => data.refunds),
        backgroundColor: '#FF33A1', // Color for Refunds
        borderColor: '#FF33A1',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h6">Sales Data Overview</Typography>
      <Bar data={chartData} options={{ responsive: true }} />
    </Grid>
  );
};
