import React, { useState, useEffect } from 'react';

import { styled } from '@mui/system';
import { grey, green } from '@mui/material/colors';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import {
  Grid,
  List,
  Table,
  Paper,
  Stack,
  Button,
  Checkbox,
  TableRow,
  ListItem,
  TableBody,
  TableCell,
  TextField,
  FormLabel,
  TableHead,
  Typography,
  IconButton,
  FormControl,
  ListItemText,
  TableContainer,
  ListItemButton,
  FormControlLabel,
} from '@mui/material';

import { fetchAgencies } from '../../api/agencies';
import { fetchDocClasses } from '../../api/docclass';
import { fetchCategories } from '../../api/categories';

// ----------------------------------------------------------------------

const StyledList = styled(List)({
  maxHeight: 300,
  minHeight: 100,
  overflow: 'auto',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginTop: '8px',
});

const DocumentForm = () => {
  const [formData, setFormData] = React.useState({
    documentNumber: '',
    issueDate: null,
    effectiveDate: null,
    issuingAuthority: [],
    documentType: '',
    fields: [],
    signer: '',
    position: '',
    summary: '',
    files: [],
  });

  const handleListItemClick = (value) => {
    setFormData((prevData) => ({ ...prevData, documentType: value }));
  };

  const [documentTypes, setDocumentTypes] = useState([]);
  const [agencyFields, setAgencyFields] = useState([]);
  const [categoryFields, setCategoryFields] = useState([]);
  const [issueDate, setIssueDate] = useState('');
  const [effecteddate, setEffecteddate] = useState('');
  const [documentCode, setDocumentCode] = useState('');
  const [countPage, setCountPage] = useState(0);

  const fetchDataDocumentType = async () => {
    const data = await fetchDocClasses();
    setDocumentTypes(data);
  };

  const fetchDataAgency = async () => {
    const data = await fetchAgencies();
    setAgencyFields(data);
  };

  const fetchDataCategories = async () => {
    const data = await fetchCategories();
    setCategoryFields(data);
  };

  useEffect(() => {
    fetchDataDocumentType();
  }, []);

  useEffect(() => {
    fetchDataAgency();
  }, []);

  useEffect(() => {
    fetchDataCategories();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
      {/* Phần Thông Tin Văn Bản */}
      <Typography variant="h5" gutterBottom>
        Thông tin văn bản
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
                  onChange={(e) => {
                    setDocumentCode(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setIssueDate(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setEffecteddate(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={8}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Typography
                  alignContent="center"
                  variant="subtitle1"
                  fontSize={14}
                  color={green[500]}
                >
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
                {agencyFields.map((field, index) => (
                  <Grid item xs={12} key={index}>
                    <FormControlLabel control={<Checkbox />} label={field.name} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Typography
                alignContent="center"
                variant="subtitle1"
                fontSize={14}
                color={green[500]}
              >
                Loại văn bản*
              </Typography>
              <StyledList>
                {documentTypes.map((type) => (
                  <ListItem key={type} disablePadding>
                    <ListItemButton
                      classes={{ color: 'rgb(1, 202, 202)' }}
                      selected={formData.documentType === type}
                      onClick={() => handleListItemClick(type)}
                    >
                      <ListItemText primary={type.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </StyledList>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField id="outlined-basic" label="Người ký văn bản" variant="outlined" />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField id="outlined-basic" label="Chức vụ" variant="outlined" />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <FormLabel>Trích yếu</FormLabel>
              <TextField fullWidth multiline rows={5} />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2} paddingX={2}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
              <Button variant="contained" color="success" onClick={() => {}}>
                Chấp nhận
              </Button>
              <Button variant="contained" color="inherit">
                Bỏ qua
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Typography
                  alignContent="center"
                  variant="subtitle1"
                  fontSize={14}
                  color={green[500]}
                >
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
              maxHeight={300}
              overflow="auto"
            >
              {categoryFields.map((field, index) => (
                <Grid item xs={4} key={index}>
                  <FormControlLabel control={<Checkbox />} label={field.name} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid container marginTop={4} gap={2}>
            <div style={{ flex: 2, flexDirection: 'column' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  File văn bản
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Tổng số trang: {countPage}
                </Typography>
              </div>
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Tên file</TableCell>
                      <TableCell>Loại file</TableCell>
                      <TableCell>Số trang</TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Document 1</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>
                        <IconButton variant="text" color="error">
                          <ClearOutlinedIcon />
                        </IconButton>
                        <IconButton variant="text" color="info">
                          <UnfoldMoreOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack direction="row" spacing={2} marginTop={2}>
                <Button variant="contained" color="success">
                  Chọn file
                </Button>
                <Button variant="contained" color="success">
                  Xem nội dung file
                </Button>
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default DocumentForm;
