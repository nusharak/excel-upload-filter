import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid2 } from '@mui/material';


export const DataTable = ({ filteredData }) => {
  return (
    <Grid2 item xs={12}>
      <Typography variant="h6">Filtered Excel Data:</Typography>
      <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table aria-label="Excel data table">
          <TableHead>
            <TableRow>
              {Object.keys(filteredData[0]).map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid2>
  );
};
