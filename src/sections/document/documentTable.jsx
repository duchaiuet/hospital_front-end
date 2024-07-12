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
  TablePagination,
} from '@mui/material';

import { convertToDDMMYYYY } from 'src/utils/format-time';

import { fetchAgencies } from 'src/api/agencies';
import { fetchDocClasses } from 'src/api/docclass';
import { getDocuments, deleteDocument } from 'src/api/document';

import ModalConfirm from 'src/components/modal/modalConfirm';

function DocumentTable() {
  const [open, setOpen] = useState({});
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [documents, setDocuments] = useState([
    {
      type: 'VĂN BẢN QUY PHẠM PHÁP LUẬT',
      name: 'HỘI ĐỒNG NHÂN DÂN TỈNH QUẢNG TRỊ',
      docs: [],
    },
    {
      type: 'VĂN BẢN KHÁC',
      name: 'ỦY BAN NHÂN DÂN TỈNH QUẢNG TRỊ',
      docs: [],
    },
  ]);

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
      pageParam = page,
      rowsPerPageParam = rowsPerPage,
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

      const newDocuments = [
        {
          type: 'VĂN BẢN QUY PHẠM PHÁP LUẬT',
          name: 'HỘI ĐỒNG NHÂN DÂN TỈNH QUẢNG TRỊ',
          docs: [],
        },
        {
          type: 'VĂN BẢN KHÁC',
          name: 'ỦY BAN NHÂN DÂN TỈNH QUẢNG TRỊ',
          docs: [],
        },
      ];

      documentRes?.data?.forEach((doc) => {
        const hasSpecialFile = /^\d{2}\/\d{4}\/.+$/.test(doc.code);

        let type = 'VĂN BẢN KHÁC';
        if (hasSpecialFile) {
          type = 'VĂN BẢN QUY PHẠM PHÁP LUẬT';
        }

        const sectionIndex = newDocuments.findIndex((section) => section.type === type);
        if (sectionIndex !== -1) {
          newDocuments[sectionIndex].docs.push({
            id: doc.id,
            title: doc.code,
            issueddate: doc.issueddate,
            abstract: doc.abstract,
            pages: doc.pagecount,
            documentFiles: doc.documentFiles.map((file) => ({
              id: file.id,
              title: file.name,
              pages: file.pagecount,
            })),
          });
        } else {
          newDocuments.push({
            type,
            name:
              type === 'VĂN BẢN QUY PHẠM PHÁP LUẬT'
                ? 'HỘI ĐỒNG NHÂN DÂN TỈNH QUẢNG TRỊ'
                : 'ỦY BAN NHÂN DÂN TỈNH QUẢNG TRỊ',
            docs: [
              {
                id: doc.id,
                title: doc.code,
                issueddate: doc.issueddate,
                abstract: doc.abstract,
                pages: doc.pagecount,
                documentFiles: doc.documentFiles.map((file) => ({
                  id: file.id,
                  title: file.name,
                  pages: file.pagecount,
                })),
              },
            ],
          });
        }
      });
      setDocuments(newDocuments);
      setCount(documentRes?.total || 0);
    },
    [page, rowsPerPage]
  );

  const handleClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              fullWidth
              label="Số, ký hiệu văn bản, Trích yếu"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              value={issueDateFrom}
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
              value={issueDateTo}
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
              fetchData(
                page,
                rowsPerPage,
                documentClass,
                documentAgency,
                issueDateFrom,
                issueDateTo,
                keyword
              );
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
        <TableContainer style={{ maxHeight: '500px' }}>
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
              {documents.flatMap((section, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell colSpan={5}>
                      <strong>{section.type}</strong> - {section.name}
                    </TableCell>
                  </TableRow>
                  {section.docs.map((doc) => (
                    <React.Fragment key={doc.id}>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleClick(doc.id)}
                          >
                            {open[doc.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                          </IconButton>
                          {doc.title}
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
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                          <Collapse in={open[doc.id]} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              <Table size="small" aria-label="related-files">
                                <TableBody>
                                  {doc.documentFiles.map((file) => (
                                    <TableRow key={file.id}>
                                      <TableCell colSpan={2}>{file.title}</TableCell>
                                      <TableCell colSpan={2} />
                                      <TableCell colSpan={4} />
                                      <TableCell colSpan={2}>{file.pages}</TableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang"
        />
        <ModalConfirm
          isOpen={isOpenDelete}
          onClose={() => {
            setIsOpenDelete(false);
          }}
          onConfirm={async () => {
            try {
              await deleteDocument(DeleteDocumentId);
              setIsOpenDelete(false);
              fetchData(
                page + 1,
                rowsPerPage,
                documentClass,
                documentAgency,
                issueDateFrom,
                issueDateTo,
                keyword
              );
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
