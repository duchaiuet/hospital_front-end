import React from 'react';

import { Box } from '@mui/material';

import DocumentTable from './documentTable';

function DocumentList() {
  return (
    <Box sx={{ mx: 4 }}>
      <DocumentTable />
    </Box>
  );
}

export default DocumentList;
