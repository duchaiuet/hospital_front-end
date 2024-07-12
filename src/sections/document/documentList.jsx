import React from 'react';

import { Box } from '@mui/material';

import ActionsPanel from './actionsPanels';
import DocumentTable from './documentTable';

function DocumentList() {
  return (
    <Box sx={{ mx: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
        <DocumentTable />
      </Box>
      <ActionsPanel />
    </Box>
  );
}

export default DocumentList;
