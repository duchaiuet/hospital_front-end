import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import { green } from '@mui/material/colors';
import { Grid, List, ListItem, Typography, ListItemText, ListItemButton } from '@mui/material';

const StyledList = styled(List)({
  maxHeight: 300,
  minHeight: 100,
  overflow: 'auto',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginTop: '8px',
});

const DocumentTypeSelector = ({ documentTypes, selectedDocTypeId, onDocTypeChange }) => (
  <Grid item xs={4}>
    <Typography alignContent="center" variant="subtitle1" fontSize={14} color={green[500]}>
      Loại văn bản*
    </Typography>
    <StyledList>
      {documentTypes.map((type) => (
        <ListItem key={type.id} disablePadding>
          <ListItemButton
            selected={selectedDocTypeId === type.id}
            onClick={() => onDocTypeChange(type.id)}
          >
            <ListItemText primary={type.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </StyledList>
  </Grid>
);

DocumentTypeSelector.propTypes = {
  documentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedDocTypeId: PropTypes.number.isRequired,
  onDocTypeChange: PropTypes.func.isRequired,
};

export default DocumentTypeSelector;
