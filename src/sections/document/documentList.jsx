import React from 'react';

import { Box } from '@mui/material';

import SearchForm from './searchForm';
import ActionsPanel from './actionsPanels';
import DocumentTable from './documentTable';

function DocumentList() {
  return (
    <Box sx={{ mx: 4 }}>
      <SearchForm />
      <Box sx={{ flexDirection: 'col' }}>
        <DocumentTable />
      </Box>
      <ActionsPanel />
    </Box>
  );
}

export default DocumentList;
