import React from 'react';
import { Select, MenuItem, Grid } from '@mui/material';

export const FilterDropdowns = ({ uniqueClients, uniqueCategories, uniqueSources, uniqueYears, selectedClient, selectedCategory, selectedSource, selectedYear, setSelectedClient, setSelectedCategory, setSelectedSource, setSelectedYear }) => {
  return (
    <>
      <Grid item xs={12} md={3}>
        <Select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} displayEmpty fullWidth>
          <MenuItem value="">All Clients</MenuItem>
          {uniqueClients.map(client => <MenuItem key={client} value={client}>{client}</MenuItem>)}
        </Select>
      </Grid>
      <Grid item xs={12} md={3}>
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} displayEmpty fullWidth>
          <MenuItem value="">All Categories</MenuItem>
          {uniqueCategories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
        </Select>
      </Grid>
      <Grid item xs={12} md={3}>
        <Select value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} displayEmpty fullWidth>
          <MenuItem value="">All Sources</MenuItem>
          {uniqueSources.map(source => <MenuItem key={source} value={source}>{source}</MenuItem>)}
        </Select>
      </Grid>
      <Grid item xs={12} md={3}>
        <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} displayEmpty fullWidth>
          <MenuItem value="">All Years</MenuItem>
          {uniqueYears.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
        </Select>
      </Grid>
    </>
  );
};
