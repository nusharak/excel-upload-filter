import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export const MetricsCards = ({ filteredData }) => {
  const totalSums = filteredData.reduce((totals, item) => {
    totals.totalCost += item[' Total Cost '] || 0;
    totals.totalSales += item[' Gross Sales '] || 0;
    totals.netPL += item['Net P/L'] || 0;
    totals.mailed += item['mailed'] || 0;
    totals.refunds += item[' Refunds '] || 0;
    totals.shippedQty += item['Ship Qty'] || 0;
    totals.grossOrders += item['Gross Orders'] || 0;
    return totals;
  }, { totalCost: 0, mailed: 0, totalSales: 0, netPL: 0, refunds: 0, shippedQty: 0, grossOrders: 0 });

  return (
    <>
      <Grid item xs={12} md={3}>
        <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
          <Typography variant="body1">Total Shipped Qty:</Typography>
          <Typography variant="h6">{totalSums.shippedQty}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
          <Typography variant="body1">Total Mailed:</Typography>
          <Typography variant="h6">{totalSums.mailed.toFixed(2)}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
          <Typography variant="body1">Total Gross Orders:</Typography>
          <Typography variant="h6">{totalSums.grossOrders}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
          <Typography variant="body1">Total Refunds:</Typography>
          <Typography variant="h6">{totalSums.refunds}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
          <Typography variant="body1">Total Cost:</Typography>
          <Typography variant="h6">{totalSums.totalCost}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
          <Typography variant="body1">Total Sales:</Typography>
          <Typography variant="h6">{totalSums.totalSales}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
          <Typography variant="body1">Total Net P/L:</Typography>
          <Typography variant="h6">{totalSums.netPL}</Typography>
        </Box>
      </Grid>
    </>
  );
};
