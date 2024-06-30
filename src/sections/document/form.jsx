// import React, { useState, useEffect } from 'react';

// import { styled } from '@mui/system';
// import { grey, green } from '@mui/material/colors';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import {
//   Grid,
//   List,
//   Table,
//   Paper,
//   Stack,
//   Button,
//   Checkbox,
//   TableRow,
//   ListItem,
//   TableBody,
//   TableCell,
//   TextField,
//   FormLabel,
//   TableHead,
//   Typography,
//   IconButton,
//   FormControl,
//   ListItemText,
//   TableContainer,
//   ListItemButton,
//   FormControlLabel,
// } from '@mui/material';

// import Categories from './category';
// import { fetchAgencies } from '../../api/agencies';
// import { createDocument } from '../../api/document';
// import { fetchDocClasses } from '../../api/docclass';
// import FileUploadModal from '../../components/modal/uploadFile';

// // ----------------------------------------------------------------------

// const StyledList = styled(List)({
//   maxHeight: 300,
//   minHeight: 100,
//   overflow: 'auto',
//   border: '1px solid #ccc',
//   borderRadius: '4px',
//   marginTop: '8px',
// });

// const DocumentForm = () => {
//   const [formData, setFormData] = React.useState({
//     documentCode: '',
//     issueDate: '',
//     effecteddate: '',
//     doctypeid: '',
//     signer: '',
//     signerposition: '',
//     files: [],
//     pagecount: 0,
//     agencyids: [],
//     categoryids: [],
//     abstract: '',
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleOpen = () => setIsModalOpen(true);
//   const handleClose = () => setIsModalOpen(false);
//   const [documentTypes, setDocumentTypes] = useState([]);
//   const [agencyFields, setAgencyFields] = useState([]);

//   const [documentCode, setDocumentCode] = useState('');
//   const [issueDate, setIssueDate] = useState('');
//   const [effecteddate, setEffecteddate] = useState('');
//   const [docTypeId, setdocTypeId] = useState('');
//   const [signer, setSigner] = useState('');
//   const [signerPosition, setSignerPosition] = useState('');
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [agencyIDs, setAgencyIDs] = useState([]);
//   const [totalPage, setTotalPage] = useState(0);

//   const handleCloseWithSelectedFiles = (files) => {
//     const countPage = files.reduce((total, file) => total + (file.pagecount || 0), 0);

//     setTotalPage(countPage);
//     setSelectedFiles(files);
//     handleClose();
//   };

//   const handleAgencyChange = (newSelectedCategories) => {};

//   const handleCategoryChange = (event, field) => {
//     setFormData((prevData) => {
//       const updatedCategories = event.target.checked
//         ? [...prevData.categoryids, field.id]
//         : prevData.categoryids.filter((id) => id !== field.id);

//       return { ...prevData, categoryids: updatedCategories };
//     });
//   };

//   const handleCreateDocument = async () => {
//     await createDocument(formData);
//   };

//   const fetchDataDocumentType = async () => {
//     const data = await fetchDocClasses();
//     setDocumentTypes(data);
//   };

//   const fetchDataAgency = async () => {
//     const data = await fetchAgencies();
//     setAgencyFields(data);
//   };

//   useEffect(() => {
//     fetchDataDocumentType();
//   }, []);

//   useEffect(() => {
//     fetchDataAgency();
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
//       {/* Phần Thông Tin Văn Bản */}
//       <Typography variant="h5" gutterBottom>
//         Thông tin văn bản
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <Grid container spacing={2}>
//             <Grid item xs={4}>
//               <Typography alignContent="center" fontSize={14} color={grey[500]}>
//                 Số ký hiệu văn bản
//               </Typography>
//               <Grid item marginTop={1}>
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   value={documentCode}
//                   onChange={(e) => {
//                     setDocumentCode(e.target.value);
//                   }}
//                 />
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Typography alignContent="center" fontSize={14} color={grey[500]}>
//                 Ngày ban hành
//               </Typography>
//               <Grid item marginTop={1}>
//                 <TextField
//                   variant="outlined"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   fullWidth
//                   value={issueDate}
//                   onChange={(e) => {
//                     setIssueDate(e.target.value);
//                   }}
//                 />
//               </Grid>
//             </Grid>

//             <Grid item xs={4}>
//               <Typography alignContent="center" fontSize={14} color={grey[500]}>
//                 Ngày bắt đầu có hiệu lực
//               </Typography>
//               <Grid item marginTop={1}>
//                 <TextField
//                   variant="outlined"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   fullWidth
//                   value={effecteddate}
//                   onChange={(e) => {
//                     setEffecteddate(e.target.value);
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid container spacing={2} mt={2}>
//             <Grid item xs={8}>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <Typography
//                   alignContent="center"
//                   variant="subtitle1"
//                   fontSize={14}
//                   color={green[500]}
//                 >
//                   Cơ quan ban hành*
//                 </Typography>
//                 <Typography alignContent="center" fontSize={14} color={grey[500]}>
//                   (chọn 1 hoặc nhiều cơ quan ban hành)
//                 </Typography>
//               </div>

//               <Grid
//                 container
//                 paddingX={2}
//                 marginTop={1}
//                 border={1}
//                 borderRadius={1}
//                 borderColor={grey[300]}
//                 minHeight={100}
//                 maxHeight={300}
//                 overflow="auto"
//               >
//                 {agencyFields.map((field, index) => (
//                   <Grid item xs={12} key={field.id}>
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={agencyIDs.includes(field.id)}
//                           onChange={(e) => handleAgencyChange(e, field.id)}
//                         />
//                       }
//                       label={field.name}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>

//             {/* <Grid item xs={4}>
//               <Typography
//                 alignContent="center"
//                 variant="subtitle1"
//                 fontSize={14}
//                 color={green[500]}
//               >
//                 Loại văn bản*
//               </Typography>
//               <StyledList>
//                 {documentTypes.map((type) => (
//                   <ListItem key={type.id} disablePadding>
//                     <ListItemButton
//                       classes={{ color: 'rgb(1, 202, 202)' }}
//                       selected={docTypeId === type.id}
//                       onClick={() => setdocTypeId(type.id)}
//                     >
//                       <ListItemText primary={type.name} />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </StyledList>
//             </Grid> */}
//           </Grid>

//           <Grid container spacing={2} mt={2}>
//             <Grid item xs={6}>
//               <Typography alignContent="center" fontSize={14} color={grey[500]}>
//                 Người ký văn bản
//               </Typography>
//               <FormControl fullWidth>
//                 <TextField
//                   id="outlined-basic"
//                   label=""
//                   variant="outlined"
//                   value={formData.signer}
//                   onChange={(e) => {
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       signer: e.target.value,
//                     }));
//                   }}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography alignContent="center" fontSize={14} color={grey[500]}>
//                 Chức vụ
//               </Typography>
//               <FormControl fullWidth>
//                 <TextField
//                   id="outlined-basic"
//                   variant="outlined"
//                   value={formData.signerposition}
//                   onChange={(e) => {
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       signerposition: e.target.value,
//                     }));
//                   }}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>

//           <Grid container spacing={2} mt={2}>
//             <Grid item xs={12}>
//               <FormLabel>Trích yếu</FormLabel>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={5}
//                 value={formData.abstract}
//                 onChange={(e) => {
//                   setFormData((prevData) => ({
//                     ...prevData,
//                     abstract: e.target.value,
//                   }));
//                 }}
//               />
//             </Grid>
//           </Grid>

//           <Grid container spacing={2} mt={2} paddingX={2}>
//             <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
//               <Button variant="contained" color="success" onClick={handleCreateDocument}>
//                 Chấp nhận
//               </Button>
//               <Button variant="contained" color="inherit">
//                 Bỏ qua
//               </Button>
//             </Stack>
//           </Grid>
//         </Grid>

//         <Grid item xs={6}>
//           <Categories onCategoriesChange={handleAgencyChange} />

//           <Grid container marginTop={1} gap={2}>
//             <div style={{ flex: 2, flexDirection: 'column' }}>
//               <div
//                 style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}
//               >
//                 <Typography variant="subtitle1" gutterBottom>
//                   File văn bản
//                 </Typography>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Tổng số trang: {formData?.pagecount || 0}
//                 </Typography>
//               </div>
//               <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//                 <Table stickyHeader>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>#</TableCell>
//                       <TableCell>Tên file</TableCell>
//                       <TableCell>Loại file</TableCell>
//                       <TableCell>Số trang</TableCell>
//                       <TableCell> </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {formData.files?.map((file, index) => (
//                       <TableRow key={file.id}>
//                         <TableCell>{index + 1}</TableCell>
//                         <TableCell>{file.name}</TableCell>
//                         <TableCell>{file.filetype}</TableCell>
//                         <TableCell>{file.pagecount}</TableCell>
//                         <TableCell>
//                           <IconButton
//                             variant="text"
//                             color="error"
//                             // onClick={() => handleRemoveFile(index)}
//                           >
//                             <ClearOutlinedIcon />
//                           </IconButton>
//                           <IconButton
//                             variant="text"
//                             color="info"
//                             // onClick={() => handleSwapUp(index)}
//                           >
//                             <ArrowUpwardIcon />
//                           </IconButton>
//                           <IconButton
//                             variant="text"
//                             color="info"
//                             // onClick={() => handleSwapDown(index)}
//                           >
//                             <ArrowDownwardIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <Stack direction="row" spacing={2} marginTop={2}>
//                 <Button variant="contained" onClick={handleOpen} color="success">
//                   Chọn file
//                 </Button>
//                 <Button variant="contained" color="success">
//                   Xem nội dung file
//                 </Button>
//               </Stack>
//             </div>
//           </Grid>
//         </Grid>
//       </Grid>

//       <FileUploadModal
//         open={isModalOpen}
//         handleClose={handleClose}
//         onCloseWithSelectedFiles={handleCloseWithSelectedFiles}
//       />
//     </div>
//   );
// };
// export default DocumentForm;

import React, { useState, useEffect } from 'react';

import { grey } from '@mui/material/colors';
import {
  Box,
  Grid,
  Stack,
  Button,
  TextField,
  FormLabel,
  Typography,
  FormControl,
} from '@mui/material';

import Categories from './category';
import FileUpload from './fileUpload';
import AgencySelector from './agency';
import DocumentDetails from './documentDetail';
import DocumentTypeSelector from './documentType';
import { fetchAgencies } from '../../api/agencies';
import { createDocument } from '../../api/document';
import { fetchDocClasses } from '../../api/docclass';
import FileUploadModal from '../../components/modal/uploadFile';

const DocumentForm = () => {
  const [formData, setFormData] = useState({
    documentCode: '',
    issueddate: '',
    effecteddate: '',
    doctypeid: null,
    signer: '',
    signerposition: '',
    files: [],
    pagecount: 0,
    agencyids: [],
    categoryids: [],
    abstract: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [agencyFields, setAgencyFields] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleCloseWithSelectedFiles = (files) => {
    const countPage = files.reduce((total, file) => total + (file.pagecount || 0), 0);
    setTotalPage(countPage);

    setFormData((prevData) => ({ ...prevData, files }));

    handleClose();
  };

  const handleAgencyChange = (event, id) => {
    const updatedAgencyIds = event.target.checked
      ? [...formData.agencyids, id]
      : formData.agencyids.filter((agencyId) => agencyId !== id);
    setFormData((prevData) => ({ ...prevData, agencyids: updatedAgencyIds }));
  };

  const handleCategoryChange = (newSelectedCategories) => {
    setFormData((prevData) => ({ ...prevData, categoryids: newSelectedCategories }));
  };

  const handleCreateDocument = async () => {
    await createDocument(formData);
  };

  const handleDocTypeChange = (id) => {
    setFormData((prevData) => ({ ...prevData, doctypeid: Number(id) }));
  };

  const fetchDataDocumentType = async () => {
    const data = await fetchDocClasses();
    setDocumentTypes(data);
  };

  const handleFilesUpdate = (updatedFiles) => {
    setFormData((prevData) => ({ ...prevData, files: updatedFiles }));
  };

  const fetchDataAgency = async () => {
    const data = await fetchAgencies();
    setAgencyFields(data);
  };

  useEffect(() => {
    fetchDataDocumentType();
  }, []);

  useEffect(() => {
    fetchDataAgency();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Thông tin văn bản
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DocumentDetails
            documentCode={formData.documentCode}
            issueddate={formData.issueddate}
            effecteddate={formData.effecteddate}
            handleInputChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={3} mt={2}>
            <AgencySelector
              agencyFields={agencyFields}
              agencyIDs={formData.agencyids}
              handleAgencyChange={handleAgencyChange}
            />
            <DocumentTypeSelector
              documentTypes={documentTypes}
              selectedDocTypeId={Number(formData.doctypeid)}
              onDocTypeChange={handleDocTypeChange}
            />
          </Box>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <Typography alignContent="center" fontSize={14} color={grey[500]}>
                Người ký văn bản
              </Typography>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={formData.signer}
                  onChange={(e) => handleInputChange('signer', e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography alignContent="center" fontSize={14} color={grey[500]}>
                Chức vụ
              </Typography>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={formData.signerposition}
                  onChange={(e) => handleInputChange('signerposition', e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <FormLabel>Trích yếu</FormLabel>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={formData.abstract}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2} paddingX={2}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
              <Button variant="contained" color="success" onClick={handleCreateDocument}>
                Chấp nhận
              </Button>
              <Button variant="contained" color="inherit">
                Bỏ qua
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Categories onCategoriesChange={handleCategoryChange} />

          <FileUpload
            selectedFiles={formData.files}
            handleOpen={handleOpen}
            totalPage={totalPage}
            onFilesUpdate={handleFilesUpdate}
          />
        </Grid>
      </Grid>

      <FileUploadModal
        open={isModalOpen}
        handleClose={handleClose}
        onCloseWithSelectedFiles={handleCloseWithSelectedFiles}
      />
    </div>
  );
};

export default DocumentForm;
