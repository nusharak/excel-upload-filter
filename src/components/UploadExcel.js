import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    accept: '.xlsx,.xls',
  });

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = await readExcelFile(file);
      setExcelData(data);
    } catch (error) {
      console.error('Error uploading file', error);
    } finally {
      setLoading(false);
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        resolve(data);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };

  const uniqueClients = useMemo(() => [...new Set(excelData.map(item => item.Client))], [excelData]);
  const uniqueCategories = useMemo(() => [...new Set(excelData.map(item => item.Category))], [excelData]);
  const uniqueSources = useMemo(() => [...new Set(excelData.map(item => item.Source))], [excelData]);
  const uniqueYears = useMemo(() => [...new Set(excelData.map(item => new Date(item['Mail Date']).getFullYear()))], [excelData]);

  const filteredData = useMemo(() => {
    return excelData.filter(item =>
      (!selectedClient || item.Client === selectedClient) &&
      (!selectedCategory || item.Category === selectedCategory) &&
      (!selectedSource || item.Source === selectedSource) &&
      (!selectedYear || new Date(item['Mail Date']).getFullYear().toString() === selectedYear)
    );
  }, [excelData, selectedClient, selectedCategory, selectedSource, selectedYear]);

  const totalSums = useMemo(() => {
    return filteredData.reduce((totals, item) => {
      totals.shippedQty += item['Ship Qty'] || 0;
      totals.mailed += item['Mailed'] || 0;
      totals.grossOrders += item['Gross Orders'] || 0;
      totals.refunds += item['Refunds'] || 0;
      return totals;
    }, { shippedQty: 0, mailed: 0, grossOrders: 0, refunds: 0 });
  }, [filteredData]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Upload Excel File</Typography>
        </Grid>
        <Grid item xs={12}>
          <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            {file ? <Typography variant="body1">{file.name}</Typography> : <Typography variant="body1">Drag & drop an Excel file or click to select</Typography>}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </Grid>

        {excelData.length > 0 && (
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

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={3}>
                <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
                  <Typography variant="body1">Total Shipped Qty:</Typography>
                  <Typography variant="h6">{totalSums.shippedQty}</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
                  <Typography variant="body1">Total Mailed:</Typography>
                  <Typography variant="h6">{totalSums.mailed}</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
                  <Typography variant="body1">Total Gross Orders:</Typography>
                  <Typography variant="h6">{totalSums.grossOrders}</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box p={2} bgcolor="#f0f0f0" borderRadius="4px">
                  <Typography variant="body1">Total Refunds:</Typography>
                  <Typography variant="h6">{totalSums.refunds}</Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Filtered Excel Data:</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: 'auto' }}>
                <Table aria-label="Excel data table">
                  <TableHead>
                    <TableRow>
                      {Object.keys(excelData[0]).map((header, index) => (
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
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default UploadExcel;
