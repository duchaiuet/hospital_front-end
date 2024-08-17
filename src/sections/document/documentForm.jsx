import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

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
  CircularProgress,
} from '@mui/material';

import Categories from './category';
import FileUpload from './fileUpload';
import AgencySelector from './agency';
import DocumentDetails from './documentDetail';
import DocumentTypeSelector from './documentType';
import { fetchAgencies } from '../../api/agencies';
import { getDocumentTypes } from '../../api/documentType';
import FileUploadModal from '../../components/modal/uploadFile';
import { createDocument, updateDocument, getDocumentById } from '../../api/document';

const DocumentForm = () => {
  const navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      setIsLoading(true);
      const result = await createDocument(formData);

      if (result.statusCode === 200) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message[0]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Tạo văn bản thất bại');
    }
  };

  const handleEditDocument = async () => {
    try {
      setIsLoading(true);
      const result = await updateDocument(documentId, formData);
      if (result.statusCode === 200) {
        toast.success(result?.message);
        fetchDataDocument(documentId);
      } else {
        toast.error(result?.message[0]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Tạo văn bản thất bại');
    }
  };

  const handleDocTypeChange = (id) => {
    setFormData((prevData) => ({ ...prevData, doctypeid: Number(id) }));
  };

  const handleFilesUpdate = (updatedFiles) => {
    setFormData((prevData) => ({ ...prevData, files: updatedFiles }));
  };

  const fetchData = useCallback(async () => {
    const docTypes = await getDocumentTypes();
    const agencies = await fetchAgencies();
    setDocumentTypes(docTypes);
    setAgencyFields(agencies);
  }, []);

  const { documentId } = useParams();

  const fetchDataDocument = useCallback(
    async (id) => {
      if (!Number(id)) {
        navigate('/document');
        return;
      }

      const infor = await getDocumentById(id);
      if (!infor) {
        navigate('/document');
        return;
      }
      setFormData({
        documentCode: infor.code,
        issueddate: new Date(infor.issueddate).toISOString().split('T')[0],
        effecteddate: new Date(infor.effecteddate).toISOString().split('T')[0],
        doctypeid: infor.doctypeid,
        signer: infor.signer,
        signerposition: infor.signerposition,
        files: infor.documentFiles,
        pagecount: infor.pagecount,
        agencyids: infor.agencyids,
        categoryids: infor.categoryids,
        abstract: infor.abstract,
      });
    },
    [navigate]
  );

  useEffect(() => {
    fetchDataDocument(documentId);
  }, [documentId, fetchDataDocument]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 20px 0 20px' }}>
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
              <Button
                disabled={isLoading}
                variant="contained"
                color="success"
                sx={{ width: '105px' }}
                onClick={documentId ? handleEditDocument : handleCreateDocument}
              >
                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Chấp nhận'}
              </Button>
              <Button variant="contained" color="inherit">
                Bỏ qua
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12} height="50%">
              <FileUpload
                selectedFiles={formData.files}
                handleOpen={handleOpen}
                totalPage={totalPage}
                onFilesUpdate={handleFilesUpdate}
              />
            </Grid>
            <Grid item xs={12}>
              <Categories
                categoriesids={formData.categoryids}
                onCategoriesChange={handleCategoryChange}
              />
            </Grid>
          </Grid>
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
