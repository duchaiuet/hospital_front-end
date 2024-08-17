import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Add,
  Edit,
  Clear,
  Search,
  Delete,
  SaveAlt,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  Table,
  Paper,
  Select,
  TableRow,
  Collapse,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
  TableContainer,
} from '@mui/material';

import { convertToDDMMYYYY } from 'src/utils/format-time';

import { fetchAgencies } from 'src/api/agencies';
import { fetchDocClasses } from 'src/api/docclass';
import { getDocuments, deleteDocument } from 'src/api/document';

import ModalConfirm from 'src/components/modal/modalConfirm';

function DocumentTable() {
  const [openLegal, setOpenLegal] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const [openLegalItem, setOpenLegalItem] = useState(new Set());
  const [openOtherItem, setOpenOtherItem] = useState(new Set());
  const [openLegalFile, setOpenlegalFile] = useState({});
  const [openOtherFile, setOpenOtherFile] = useState({});

  const [documents, setDocuments] = useState([]);

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // Set max height of the dropdown menu
      },
    },
  };

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [DeleteDocumentId, setDeleteDocumentId] = useState(null);

  const [agencyFields, setAgencyFields] = useState([]);
  const [typeFields, setTypeFields] = useState([]);
  const [documentClass, setDocumentClass] = useState(null);
  const [documentAgency, setDocumentAgency] = useState(null);
  const [issueDateFrom, setIssueDateFrom] = useState('');
  const [issueDateTo, setIssueDateTo] = useState('');
  const [keyword, setKeyword] = useState('');

  const fetchDataSearch = useCallback(async () => {
    const docTypes = await fetchDocClasses();
    const agencies = await fetchAgencies();

    setAgencyFields(agencies);
    setTypeFields(docTypes);
  }, []);

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/document');
  };
  const handleEditClick = (selectedId) => {
    navigate(`/document/${selectedId}`);
  };

  const fetchData = useCallback(
    async (
      pageParam = 1,
      rowsPerPageParam = 10,
      documentClassParam = '',
      documentAgencyParam = '',
      issueDateFromParam = '',
      issueDateToParam = '',
      keywordParam = ''
    ) => {
      const documentRes = await getDocuments(
        pageParam,
        rowsPerPageParam,
        keywordParam,
        issueDateFromParam,
        issueDateToParam,
        documentAgencyParam,
        documentClassParam
      );
      setDocuments(documentRes?.data || []);
      console.log(documentRes?.data);
    },
    []
  );

  const handleClear = useCallback(() => {
    setDocumentClass('');
    setDocumentAgency('');
    setIssueDateFrom('');
    setIssueDateTo('');
    setKeyword('');
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchDataSearch();
  }, [fetchDataSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <Box sx={{ display: 'flex', my: 2, spacing: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={keyword || ''}
              onChange={(e) => setKeyword(e.target.value)}
              fullWidth
              label="Số, ký hiệu văn bản, Trích yếu"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              value={issueDateFrom || ''}
              onChange={(e) => {
                setIssueDateFrom(e.target.value);
              }}
              label="Ngày ban hành: Từ"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              value={issueDateTo || ''}
              onChange={(e) => {
                setIssueDateTo(e.target.value);
              }}
              label="Đến"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Cơ quan ban hành</InputLabel>
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
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Loại văn bản</InputLabel>
              <Select
                label="Loại văn bản"
                value={documentClass}
                onChange={(e) => setDocumentClass(e.target.value)}
                MenuProps={menuProps}
              >
                {typeFields.map((option) => (
                  <MenuItem key={option.id} value={option.id} style={{ height: 48 }}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" alignItems="baseline" justifyContent="flex-end" sx={{ ml: 2, mt: 1 }}>
          <IconButton
            color="primary"
            onClick={() => {
              fetchData(0, 10, documentClass, documentAgency, issueDateFrom, issueDateTo, keyword);
            }}
          >
            <Search />
          </IconButton>
          <IconButton color="primary" onClick={handleAddClick}>
            <Add />
          </IconButton>
          <IconButton color="primary">
            <SaveAlt />
          </IconButton>
          <IconButton color="primary" onClick={handleClear}>
            <Clear />
          </IconButton>
        </Box>
      </Box>
      <Paper>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Văn bản</TableCell>
                <TableCell colSpan={2}>Ngày ban hành</TableCell>
                <TableCell colSpan={4}>Trích yếu</TableCell>
                <TableCell colSpan={2}>Số trang</TableCell>
                <TableCell colSpan={2}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={12}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpenLegal(!openLegal)}
                  >
                    {openLegal ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                  VĂN BẢN QUY PHẠM PHÁP LUẬT
                </TableCell>
              </TableRow>
              {openLegal ? (
                <>
                  {documents?.legal?.map((legal) => (
                    <React.Fragment key={legal.id}>
                      <TableRow>
                        <TableCell style={{ paddingLeft: '32px' }} colSpan={12}>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() =>
                              setOpenLegalItem((prevState) => {
                                const newState = new Set(prevState);
                                if (newState.has(legal.agencyName)) {
                                  newState.delete(legal.agencyName);
                                } else {
                                  newState.add(legal.agencyName);
                                }
                                return newState;
                              })
                            }
                          >
                            {openLegalItem.has(legal.agencyName) ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                          {legal.agencyName}
                        </TableCell>
                      </TableRow>
                      {openLegalItem.has(legal.agencyName) &&
                        legal?.documents?.map((doc) => (
                          <React.Fragment key={doc.id}>
                            <TableRow>
                              <TableCell style={{ paddingLeft: '44px' }} colSpan={2}>
                                <IconButton
                                  aria-label="expand row"
                                  size="small"
                                  onClick={() => {
                                    setOpenlegalFile((prevState) => ({
                                      ...prevState,
                                      [doc.id]: !prevState[doc.id],
                                    }));
                                  }}
                                >
                                  {openLegalFile[doc.id] ? (
                                    <KeyboardArrowUp />
                                  ) : (
                                    <KeyboardArrowDown />
                                  )}
                                </IconButton>
                                {doc.code}
                              </TableCell>
                              <TableCell colSpan={2}>{convertToDDMMYYYY(doc.issueddate)}</TableCell>
                              <TableCell colSpan={4}>{doc.abstract}</TableCell>
                              <TableCell colSpan={2} align="center">
                                {doc.pages}
                              </TableCell>
                              <TableCell colSpan={2}>
                                <IconButton
                                  color="primary"
                                  onClick={() => {
                                    handleEditClick(doc.id);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  color="secondary"
                                  onClick={() => {
                                    setIsOpenDelete(true);
                                    setDeleteDocumentId(doc.id);
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ padding: '0 0 0 40px' }} colSpan={12}>
                                <Collapse in={openLegalFile[doc.id]} timeout="auto" unmountOnExit>
                                  <Box margin={1}>
                                    <Table size="small" aria-label="related-files">
                                      <TableBody>
                                        {doc?.documentFiles?.map((file) => (
                                          <TableRow key={file.id}>
                                            <TableCell colSpan={2}>{file.name}</TableCell>
                                            <TableCell colSpan={2} />
                                            <TableCell colSpan={4} />
                                            <TableCell colSpan={2} align="center">
                                              {file.pagecount}
                                            </TableCell>
                                            <TableCell colSpan={2} />
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                    </React.Fragment>
                  ))}
                </>
              ) : null}

              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpenOther(!openOther)}
                  >
                    {openOther ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                  VĂN BẢN QUY KHÁC
                </TableCell>
              </TableRow>
              {openOther ? (
                <>
                  {documents?.other?.map((other) => (
                    <React.Fragment key={other.id}>
                      <TableRow>
                        <TableCell style={{ paddingLeft: '32px' }} colSpan={12}>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                              setOpenOtherItem((prevState) => {
                                const newState = new Set(prevState);
                                if (newState.has(other.agencyName)) {
                                  newState.delete(other.agencyName);
                                } else {
                                  newState.add(other.agencyName);
                                }
                                return newState;
                              });
                            }}
                          >
                            {openOtherItem.has(other.agencyName) ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                          {other.agencyName}
                        </TableCell>
                      </TableRow>

                      {openOtherItem.has(other.agencyName) &&
                        other?.documents?.map((doc) => (
                          <React.Fragment key={doc.id}>
                            <TableRow>
                              <TableCell style={{ paddingLeft: '44px' }} colSpan={2}>
                                <IconButton
                                  aria-label="expand row"
                                  size="small"
                                  onClick={() => {
                                    setOpenOtherFile((prevState) => ({
                                      ...prevState,
                                      [doc.id]: !prevState[doc.id],
                                    }));
                                  }}
                                >
                                  {openOtherFile[doc.id] ? (
                                    <KeyboardArrowUp />
                                  ) : (
                                    <KeyboardArrowDown />
                                  )}
                                </IconButton>
                                {doc.code}
                              </TableCell>
                              <TableCell colSpan={2}>{convertToDDMMYYYY(doc.issueddate)}</TableCell>
                              <TableCell colSpan={4}>{doc.abstract}</TableCell>
                              <TableCell colSpan={2} align="center">
                                {doc.pages}
                              </TableCell>
                              <TableCell colSpan={2}>
                                <IconButton
                                  color="primary"
                                  onClick={() => {
                                    handleEditClick(doc.id);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  color="secondary"
                                  onClick={() => {
                                    setIsOpenDelete(true);
                                    setDeleteDocumentId(doc.id);
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ paddingLeft: '32px' }} colSpan={12}>
                                <Table size="small" aria-label="related-files">
                                  <TableBody>
                                    {doc?.documentFiles?.map((file) => (
                                      <TableRow key={file.id}>
                                        <TableCell colSpan={3}>{file.name}</TableCell>
                                        <TableCell colSpan={2} />
                                        <TableCell colSpan={4} />
                                        <TableCell colSpan={2}>{file.pagecount}</TableCell>
                                        <TableCell colSpan={2} />
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                    </React.Fragment>
                  ))}
                </>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>

        <ModalConfirm
          isOpen={isOpenDelete}
          onClose={() => {
            setIsOpenDelete(false);
          }}
          onConfirm={async () => {
            try {
              await deleteDocument(DeleteDocumentId);
              setIsOpenDelete(false);
              fetchData(0, 10, documentClass, documentAgency, issueDateFrom, issueDateTo, keyword);
            } catch (error) {
              setIsOpenDelete(false);
              toast.error('Xóa văn bản không thành công');
            }
          }}
          title="Bạn có chắc chắn muốn xóa văn bản này?"
          content="Hành động này không thể được hoàn tác. Tất cả các dữ liệu liên quan sẽ bị xóa."
        />
      </Paper>
    </>
  );
}

export default DocumentTable;
