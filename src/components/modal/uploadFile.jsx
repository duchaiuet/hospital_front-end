import React, { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Tab,
  Tabs,
  Modal,
  Table,
  Button,
  Checkbox,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';

import { fetchDocuments } from '../../api/docfile';

const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'hidden;',
  position: 'relative',
};

const buttonContainerStyle = {
  padding: '16px',
  borderTop: '1px solid #ddd',
  textAlign: 'center',
  background: '#fff',
};
// eslint-disable-next-line react/prop-types
const FileUploadModal = ({ open, handleClose, onCloseWithSelectedFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);

      try {
        const response = await fetch('http://localhost:3000/document-detail', {
          method: 'POST',
          headers: {
            accept: '*/*',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('File uploaded successfully:', result);
        setFiles([...files, selectedFile.name]);
        setSelectedFile(null);
        setError('');
        handleClose();
      } catch (e) {
        console.error('Error uploading file:', error);
        setError('Failed to upload file. Please try again.');
      }
    }
  };

  const handleCloseWithFiles = () => {
    if (onCloseWithSelectedFiles) {
      onCloseWithSelectedFiles(selectedFiles);
    }
    handleClose();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchDocumentsList = async (page, pageSize) => {
    try {
      const result = await fetchDocuments(page, pageSize);
      setFiles(result.data);
      setLoading(false);
    } catch (e) {
      setError('Failed to fetch documents. Please try again.');
      setLoading(false);
    }
  };

  const handleCheckboxChange = (file) => {
    console.log('file: ', file);
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(file)
        ? prevSelected.filter((id) => id !== file.id)
        : [...prevSelected, file]
    );
  };
  useEffect(() => {
    if (tabValue === 1) {
      fetchDocumentsList(1, 10);
    }
  }, [tabValue]);

  return (
    <Modal
      open={open}
      onClose={handleCloseWithFiles}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style} borderRadius={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography id="modal-title" variant="h6" component="h2">
            File Management
          </Typography>
          <IconButton onClick={handleCloseWithFiles}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Upload File" />
          <Tab label="List Files" />
        </Tabs>
        {tabValue === 0 && (
          <Box sx={{ mt: 2, overflow: 'hidden' }}>
            <TextField type="file" onChange={handleFileChange} fullWidth margin="normal" />
            <Button variant="contained" color="success" onClick={handleUpload} fullWidth>
              Upload
            </Button>
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ mt: 2, height: 'calc(100% - 150px)', overflow: 'auto' }}>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Link</TableCell>
                      <TableCell>Document ID</TableCell>
                      <TableCell>File Type</TableCell>
                      <TableCell>Document No</TableCell>
                      <TableCell>Gazette ID</TableCell>
                      <TableCell>Gazette No</TableCell>
                      <TableCell>Page Count</TableCell>
                      <TableCell>Page Start</TableCell>
                      <TableCell>Page End</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {files.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedFiles.includes(file)}
                            onChange={() => handleCheckboxChange(file)}
                          />
                        </TableCell>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>{file.link}</TableCell>
                        <TableCell>{file.documentId}</TableCell>
                        <TableCell>{file.filetype}</TableCell>
                        <TableCell>{file.documentno}</TableCell>
                        <TableCell>{file.gazetteId}</TableCell>
                        <TableCell>{file.gazetteno}</TableCell>
                        <TableCell>{file.pagecount}</TableCell>
                        <TableCell>{file.pagestart}</TableCell>
                        <TableCell>{file.pageend}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={buttonContainerStyle}>
            <Button variant="contained" onClick={handleCloseWithFiles} color="success">
              Chọn file
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default FileUploadModal;
