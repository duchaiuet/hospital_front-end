import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { grey, green } from '@mui/material/colors';
import { Box, Checkbox, Typography, FormControlLabel } from '@mui/material';

import { fetchCategories } from '../../api/categories';

// ----------------------------------------------------------------------

const Categories = ({ categoriesids, onCategoriesChange }) => {
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
    setCategoryIDs(categoriesids);
  }, [categoriesids]);

  const handleCategoryChange = (event, fieldId) => {
    const newCategoryIds = event.target.checked
      ? [...categoryIDs, fieldId]
      : categoryIDs.filter((id) => id !== fieldId);
    setCategoryIDs(newCategoryIds);
    onCategoriesChange(newCategoryIds);
  };

  return (
    <Box container mt={2}>
      <Box item>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Typography alignContent="center" variant="subtitle1" fontSize={14} color={green[500]}>
            Lĩnh vực*
          </Typography>
          <Typography alignContent="center" fontSize={14} color={grey[500]}>
            (chọn 1 hoặc nhiều lĩnh vực)
          </Typography>
        </div>
      </Box>
      <Box
        container
        paddingX={2}
        border={1}
        marginTop={1}
        borderRadius={1}
        borderColor={grey[300]}
        maxHeight={420}
        overflow="auto"
      >
        {categoryFields &&
          categoryFields.map((field) => (
            <Box key={field.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={categoryIDs.includes(field.id)}
                    onChange={(e) => handleCategoryChange(e, field.id)}
                  />
                }
                label={field.name}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

Categories.propTypes = {
  categoriesids: PropTypes.array.isRequired,
  onCategoriesChange: PropTypes.func.isRequired,
};

export default Categories;
