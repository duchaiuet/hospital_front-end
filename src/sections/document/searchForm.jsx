import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import { Add, Search, SaveAlt } from '@mui/icons-material';
import {
  Box,
  Grid,
  // Select,
  // MenuItem,
  TextField,
  // InputLabel,
  IconButton,
  FormControl,
} from '@mui/material';

import { fetchAgencies } from '../../api/agencies';
import { getDocumentTypes } from '../../api/documentType';

function SearchForm() {
  const [agencyFieldsOpts, setAgencyFieldsOpts] = useState([]);
  const [typeFieldsOpts, setTypeFieldsOpts] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [documentAgency, setDocumentAgency] = useState('');

  const fetchData = useCallback(async () => {
    const docTypes = await getDocumentTypes();
    const agencies = await fetchAgencies();

    setAgencyFieldsOpts(agencies.map((agency) => ({ label: agency.name, value: agency.id })));
    setTypeFieldsOpts(docTypes.map((type) => ({ label: type.name, value: type.id })));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/document');
  };

  // const menuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: 200, // Set max height of the dropdown menu
  //     },
  //   },
  // };

  return (
    <Box sx={{ display: 'flex', my: 2, spacing: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Số, ký hiệu văn bản, Trích yếu" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Ngày ban hành: Từ"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Đến"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              disablePortal
              onChange={(e, value) => {
                setDocumentAgency(value);
              }}
              options={agencyFieldsOpts}
              renderInput={(params) => (
                <TextField {...params} key={params.value} label="Cơ quan ban hành" />
              )}
            />
            {/* <InputLabel>Cơ quan ban hành</InputLabel>
            <Select
              label="Cơ quan ban hành"
              value={documentAgency}
              onChange={(e) => setDocumentAgency(e.target.value)}
              MenuProps={menuProps}
            >
              {agencyFields.map((option) => (
                <MenuItem key={option.id} value={option.id} style={{ height: 48 }}>
                  {option.name}
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              disablePortal
              onChange={(e, value) => {
                console.log('documentType: ', documentType);
                setDocumentType(value);
              }}
              options={typeFieldsOpts}
              renderInput={(params) => <TextField {...params} label="Loại văn bản" />}
            />
            {/* <InputLabel>Loại văn bản</InputLabel>
            <Select
              label="Loại văn bản"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              MenuProps={menuProps}
            >
              {documentTypes.map((option) => (
                <MenuItem key={option.id} value={option.id} style={{ height: 48 }}>
                  {`${option.name} - ${option.code}`}
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" alignItems="baseline" justifyContent="flex-end" sx={{ ml: 2, mt: 1 }}>
        <IconButton color="primary">
          <Search />
        </IconButton>
        <IconButton color="primary" onClick={handleAddClick}>
          <Add />
        </IconButton>
        <IconButton color="primary">
          <SaveAlt />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SearchForm;
