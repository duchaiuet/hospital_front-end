import React from 'react';
import PropTypes from 'prop-types';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Grid,
  Table,
  Paper,
  Stack,
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';

const FileUpload = ({ selectedFiles, handleOpen, totalPage, onFilesUpdate }) => {
  const handleSwapUp = (index) => {
    if (index > 0) {
      const newFiles = [...selectedFiles];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      onFilesUpdate(newFiles);
    }
  };

  const handleSwapDown = (index) => {
    if (index < selectedFiles.length - 1) {
      const newFiles = [...selectedFiles];
      [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
      onFilesUpdate(newFiles);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onFilesUpdate(newFiles);
  };

  return (
    <Grid container marginTop={1} gap={2}>
      <div style={{ flex: 2, flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}>
          <Typography variant="subtitle1" gutterBottom>
            File văn bản
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Tổng số trang: {totalPage}
          </Typography>
        </div>
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Tên file</TableCell>
                <TableCell>Loại file</TableCell>
                <TableCell>Số trang</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedFiles.map((file, index) => (
                <TableRow key={file.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.filetype}</TableCell>
                  <TableCell>{file.pagecount}</TableCell>
                  <TableCell>
                    <IconButton
                      variant="text"
                      color="error"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <ClearOutlinedIcon />
                    </IconButton>
                    <IconButton variant="text" color="info" onClick={() => handleSwapUp(index)}>
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton variant="text" color="info" onClick={() => handleSwapDown(index)}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" spacing={2} marginTop={2}>
          <Button variant="contained" onClick={handleOpen} color="success">
            Chọn file
          </Button>
          <Button variant="contained" color="success">
            Xem nội dung file
          </Button>
        </Stack>
      </div>
    </Grid>
  );
};

FileUpload.propTypes = {
  selectedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      filetype: PropTypes.number.isRequired,
      pagecount: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleOpen: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
  onFilesUpdate: PropTypes.func.isRequired,
};

export default FileUpload;
