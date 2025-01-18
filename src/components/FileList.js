import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

const FileList = ({ onSelect }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <List>
      {files.map((file, index) => (
        <ListItem key={index} button onClick={() => onSelect(file.path)}>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
