import React from 'react';

import { grey, green } from '@mui/material/colors';
import {
  Grid,
  Table,
  Paper,
  Stack,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  FormLabel,
  TableHead,
  Typography,
  FormControl,
  TableContainer,
  FormControlLabel,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function AppView() {
  const agencyFields = [
    'An ninh',
    'Chính sách xã hội',
    'Công nghiệp',
    'Giao thông vận tải',
    'Giáo dục đào tạo',
    'Nông nghiệp',
    'Thuế - phí và lệ phí',
    'Thương mại',
    'An ninh',
    'Chính sách xã hội',
    'Công nghiệp',
    'Giao thông vận tải',
    'Giáo dục đào tạo',
    'Nông nghiệp',
    'Thuế - phí và lệ phí',
    'Thương mại',
    'An ninh',
    'Chính sách xã hội',
    'Công nghiệp',
    'Giao thông vận tải',
    'Giáo dục đào tạo',
    'Nông nghiệp',
    'Thuế - phí và lệ phí',
    'Thương mại',
    'Thuế - phí và lệ phí',
    'Thương mại',
  ];

  const categoryFields = [
    'An ninh',
    'Chính sách xã hội',
    'Công nghiệp',
    'Giao thông vận tải',
    'Giáo dục đào tạo',
    'Nông nghiệp',
    'Thuế - phí và lệ phí',
    'Thương mại',
    'An ninh',
    'Chính sách xã hội',
    'Công nghiệp',
    'Giao thông vận tải',
    'Giáo dục đào tạo',
    'Nông nghiệp',
    'Thuế - phí và lệ phí',
    'Thương mại',
    'Thuế - phí và lệ phí',
    'Thương mại',
    'An ninh',
    'Chính sách xã hội',
    'Công nghiệp',
    'Giao thông vận tải',
    'Giáo dục đào tạo',
    'Nông nghiệp',
    'Thuế - phí và lệ phí',
    'Thương mại',
    'An ninh',
    'Chính sách xã hội',
    'Công nghiệp',
    'Giao thông vận tải',
    'Giáo dục đào tạo',
    'Nông nghiệp',
    'Thuế - phí và lệ phí',
    'Thương mại',
    'Thuế - phí và lệ phí',
    'Thương mại',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
      {/* Phần Thông Tin Văn Bản */}

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid>
            <Typography variant="h5" gutterBottom>
              Thông tin văn bản
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid item>
                <TextField label="Số ký hiệu văn bản" variant="outlined" fullWidth />
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Ngày ban hành"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Ngày bắt đầu có hiệu lực"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={8}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Typography
                  alignContent="center"
                  variant="subtitle1"
                  fontSize={16}
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
                    <FormControlLabel control={<Checkbox />} label={field} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Typography
                  alignContent="center"
                  variant="subtitle1"
                  fontSize={16}
                  color={green[500]}
                >
                  Loại văn bản*
                </Typography>
              </div>
              <Grid container marginTop={1}>
                <FormControl fullWidth>
                  <Select defaultValue="">
                    <MenuItem value="1">Thông báo</MenuItem>
                    <MenuItem value="2">Quyết định</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
              <TextField fullWidth multiline rows={3} />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2} paddingX={2}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
              <Button variant="contained" color="primary">
                Chấp nhận
              </Button>
              <Button variant="contained" color="info">
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
                  fontSize={16}
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
              marginTop={1}
              border={1}
              borderRadius={1}
              borderColor={grey[300]}
              minHeight={100}
              maxHeight={300}
              overflow="auto"
            >
              {categoryFields.map((field, index) => (
                <Grid item xs={4} key={index}>
                  <FormControlLabel control={<Checkbox />} label={field} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid container marginTop={4}>
            <div style={{ flex: 2, flexDirection: 'column' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  File văn bản
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Tổng số trang: {1}
                </Typography>
              </div>
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: 'bold', backgroundColor: '#9ca3af', color: 'white' }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: 'bold', backgroundColor: '#9ca3af', color: 'white' }}
                      >
                        Tên file
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: 'bold', backgroundColor: '#9ca3af', color: 'white' }}
                      >
                        Loại file
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: 'bold', backgroundColor: '#9ca3af', color: 'white' }}
                      >
                        Số trang
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: 'bold', backgroundColor: '#9ca3af', color: 'white' }}
                      >
                        Xem nội dung
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Document 1</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'end',
                            paddingBottom: '10px',
                          }}
                        >
                          <Button variant="contained" color="primary">
                            Chọn file
                          </Button>
                          <Button variant="contained" color="info">
                            Xem file
                          </Button>
                          <Button variant="contained" color="error">
                            Xóa file
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Document 1</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'end',
                            paddingBottom: '10px',
                          }}
                        >
                          <Button variant="contained" color="primary">
                            Chọn file
                          </Button>
                          <Button variant="contained" color="info">
                            Xem file
                          </Button>
                          <Button variant="contained" color="error">
                            Xóa file
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Document 1</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'end',
                            paddingBottom: '10px',
                          }}
                        >
                          <Button variant="contained" color="primary">
                            Chọn file
                          </Button>
                          <Button variant="contained" color="info">
                            Xem file
                          </Button>
                          <Button variant="contained" color="error">
                            Xóa file
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Document 1</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'end',
                            paddingBottom: '10px',
                          }}
                        >
                          <Button variant="contained" color="primary">
                            Chọn file
                          </Button>
                          <Button variant="contained" color="info">
                            Xem file
                          </Button>
                          <Button variant="contained" color="error">
                            Xóa file
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Document 1</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'end',
                            paddingBottom: '10px',
                          }}
                        >
                          <Button variant="contained" color="primary">
                            Chọn file
                          </Button>
                          <Button variant="contained" color="info">
                            Xem file
                          </Button>
                          <Button variant="contained" color="error">
                            Xóa file
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
