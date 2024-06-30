import React from 'react';
import PropTypes from 'prop-types';

import { grey, green } from '@mui/material/colors';
import { Grid, Checkbox, Typography, FormControlLabel } from '@mui/material';

const AgencySelector = React.memo(({ agencyFields, agencyIDs, handleAgencyChange }) => (
  <Grid item xs={8}>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Typography alignContent="center" variant="subtitle1" fontSize={14} color={green[500]}>
        Cơ quan ban hành*
      </Typography>
      <Typography alignContent="center" fontSize={14} color={grey[500]}>
        (chọn 1 hoặc nhiều cơ quan ban hành)
      </Typography>
    </div>

    <Grid
      container
      paddingX={2}
      marginTop={1}
      border={1}
      borderRadius={1}
      borderColor={grey[300]}
      minHeight={100}
      maxHeight={300}
      overflow="auto"
    >
      {agencyFields.map((field) => (
        <Grid item xs={12} key={field.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agencyIDs.includes(field.id)}
                onChange={(e) => handleAgencyChange(e, field.id)}
              />
            }
            label={field.name}
          />
        </Grid>
      ))}
    </Grid>
  </Grid>
));

AgencySelector.propTypes = {
  agencyFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  agencyIDs: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleAgencyChange: PropTypes.func.isRequired,
};

export default AgencySelector;
