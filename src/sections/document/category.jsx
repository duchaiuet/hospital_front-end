import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { grey, green } from '@mui/material/colors';
import { Grid, Checkbox, Typography, FormControlLabel } from '@mui/material';

import { fetchCategories } from '../../api/categories';

// ----------------------------------------------------------------------

const Categories = ({ onCategoriesChange }) => {
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [categoryFields, setCategoryFields] = useState([]);

  useEffect(() => {
    fetchDataCategories();
  }, []);

  const fetchDataCategories = async () => {
    const data = await fetchCategories();
    setCategoryFields(data);
  };

  useEffect(() => {
    onCategoriesChange(categoryIDs);
  }, [categoryIDs, onCategoriesChange]);

  const handleCategoryChange = (event, fieldId) => {
    setCategoryIDs((prevIDs) =>
      event.target.checked ? [...prevIDs, fieldId] : prevIDs.filter((id) => id !== fieldId)
    );
  };

  return (
    <Grid container>
      <Grid item>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Typography alignContent="center" variant="subtitle1" fontSize={14} color={green[500]}>
            Lĩnh vực*
          </Typography>
          <Typography alignContent="center" fontSize={14} color={grey[500]}>
            (chọn 1 hoặc nhiều lĩnh vực)
          </Typography>
        </div>
      </Grid>
      <Grid
        container
        paddingX={2}
        border={1}
        marginTop={1}
        borderRadius={1}
        borderColor={grey[300]}
        minHeight={100}
        maxHeight={420}
        overflow="auto"
      >
        {categoryFields &&
          categoryFields.map((field, index) => (
            <Grid item xs={4} key={field.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={categoryIDs.includes(field.id)}
                    onChange={(e) => handleCategoryChange(e, field.id)}
                  />
                }
                label={field.name}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

Categories.propTypes = {
  onCategoriesChange: PropTypes.func.isRequired,
};

export default Categories;
