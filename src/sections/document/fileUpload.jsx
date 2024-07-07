import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const columns = [
  { id: 'order', label: '', minWidth: 10 },
  { id: 'file', label: 'Tên file ', minWidth: 200 },
  { id: 'category', label: 'Loại file', minWidth: 100 },
  {
    id: 'pageCount',
    label: 'Số trang ',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'size',
    label: '',
    minWidth: 130,
    align: 'right',
  },
];

const FilePreview = ({ selectedFiles, handleOpen, totalPage, onFilesUpdate }) => {
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
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '10px',
          verticalAlign: 'middle',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          File văn bản
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tổng số trang: {totalPage}
        </Typography>
      </div>
      <TableContainer sx={{ height: '40%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedFiles.map((file, index) => (
              <TableRow hover tabIndex={-1} key={file.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.filetype}</TableCell>
                <TableCell>{file.pagecount}</TableCell>
                <TableCell>
                  <IconButton variant="text" color="error" onClick={() => handleRemoveFile(index)}>
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
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={handleOpen} color="success">
            Chọn file
          </Button>
          <Button variant="contained" color="success">
            Xem nội dung file
          </Button>
        </Box>
      </TableContainer>
    </div>
  );
};

FilePreview.propTypes = {
  selectedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      filetype: PropTypes.string,
      pagecount: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleOpen: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
  onFilesUpdate: PropTypes.func.isRequired,
};
export default FilePreview;
