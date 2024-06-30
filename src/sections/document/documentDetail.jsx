import React from 'react';
import PropTypes from 'prop-types';

import { grey } from '@mui/material/colors';
import { Grid, TextField, Typography } from '@mui/material';

const DocumentDetails = React.memo(
  ({ documentCode, issueDate, effecteddate, handleInputChange }) => (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography alignContent="center" fontSize={14} color={grey[500]}>
          Số ký hiệu văn bản
        </Typography>
        <Grid item marginTop={1}>
          <TextField
            variant="outlined"
            fullWidth
            value={documentCode}
            onChange={(e) => handleInputChange('documentCode', e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Typography alignContent="center" fontSize={14} color={grey[500]}>
          Ngày ban hành
        </Typography>
        <Grid item marginTop={1}>
          <TextField
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={issueDate}
            onChange={(e) => handleInputChange('issueDate', e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Typography alignContent="center" fontSize={14} color={grey[500]}>
          Ngày bắt đầu có hiệu lực
        </Typography>
        <Grid item marginTop={1}>
          <TextField
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={effecteddate}
            onChange={(e) => handleInputChange('effecteddate', e.target.value)}
          />
        </Grid>
      </Grid>
    </Grid>
  )
);

DocumentDetails.propTypes = {
  documentCode: PropTypes.string.isRequired,
  issueDate: PropTypes.string.isRequired,
  effecteddate: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default DocumentDetails;
