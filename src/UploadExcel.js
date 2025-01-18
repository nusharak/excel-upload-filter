import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { readExcelFile } from './utils/readExcelFile';
import { FilterDropdowns } from './components/FilterDropdowns';
import { MetricsCards } from './components/MetricsCards';
import { DataTable } from './components/DataTable';
import { BarChart } from './components/BarChart';
import { getColor } from './utils/getColor';

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
            {/* Filter Dropdowns */}
            <FilterDropdowns
              uniqueClients={uniqueClients}
              uniqueCategories={uniqueCategories}
              uniqueSources={uniqueSources}
              uniqueYears={uniqueYears}
              selectedClient={selectedClient}
              selectedCategory={selectedCategory}
              selectedSource={selectedSource}
              selectedYear={selectedYear}
              setSelectedClient={setSelectedClient}
              setSelectedCategory={setSelectedCategory}
              setSelectedSource={setSelectedSource}
              setSelectedYear={setSelectedYear}
            />

            {/* Metrics Cards */}
            <MetricsCards filteredData={filteredData} />

            {/* Data Table */}
            <DataTable filteredData={filteredData} />

            {/* Bar Chart */}
            <BarChart filteredData={filteredData} />
          </>
        )}
      </Grid>
    </div>
  );
};

export default UploadExcel;
