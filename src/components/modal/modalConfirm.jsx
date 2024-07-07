import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const ModalConfirm = ({ isOpen, onClose, onConfirm, content, title }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Box display="flex" alignItems="center" flexDirection="column" p={2}>
        <ReportGmailerrorredIcon color="error" fontSize="large" />
        <DialogTitle id="responsive-dialog-title">
          <div>{title}</div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" align="center">
            {content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} variant="contained" style={{ margin: '0 8px' }}>
            Đồng ý
          </Button>
          <Button onClick={onClose} variant="contained" color="error" style={{ margin: '0 8px' }}>
            Hủy
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

ModalConfirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalConfirm;
