import { toast } from 'react-toastify';
import React, { useState, useEffect, useCallback } from 'react';

import { Edit, Delete, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import {
  Box,
  Table,
  Paper,
  TableRow,
  Collapse,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { convertToDDMMYYYY } from 'src/utils/format-time';

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
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [DeleteDocumentId, setDeleteDocumentId] = useState(null);
  const fetchData = useCallback(async () => {
    const { result, total } = await getDocuments(page + 1, rowsPerPage);
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

    result?.forEach((doc) => {
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
    setCount(total);
  }, [page, rowsPerPage]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
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
                      <TableCell colSpan={2}>{doc.pages}</TableCell>
                      <TableCell colSpan={2}>
                        <IconButton color="primary">
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
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open[doc.id]} timeout="auto" unmountOnExit>
                          <Box margin={1}>
                            <Table size="small" aria-label="related-files">
                              <TableBody>
                                {doc.documentFiles.map((file) => (
                                  <TableRow key={file.id}>
                                    <TableCell>{file.title}</TableCell>
                                    <TableCell>{file.pages}</TableCell>
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
            fetchData();
          } catch (error) {
            setIsOpenDelete(false);
            toast.error('Xóa văn bản không thành công');
          }
        }}
        title="Bạn có chắc chắn muốn xóa văn bản này?"
        content="Hành động này không thể được hoàn tác. Tất cả các dữ liệu liên quan sẽ bị xóa."
      />
    </Paper>
  );
}

export default DocumentTable;
