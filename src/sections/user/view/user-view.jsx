import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';
import { createGazette } from 'src/api/gazette';
import { filterDocument } from 'src/api/document';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [documents, setDocuments] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleExport = async () => {
    const documentData = {
      documentIds: selected,
      documentFileIds: [],
      headertext: '',
    };

    selected.forEach((sel) => {
      const doc = documents.find((d) => d.id === sel);
      if (doc && doc.documentFiles?.length > 0) {
        const docFildIds = doc.documentFiles.map((f) => f.id);
        documentData.documentFileIds.push(...docFildIds);
      }
    });
    console.log('export', selected);
    console.log('export', documentData.documentFileIds);

    await createGazette(documentData);
  };

  const fetchData = useCallback(async () => {
    const result = await filterDocument(page, rowsPerPage);
    setDocuments(result.documents);
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // const notFound = !documents.length && !!documents;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Công báo</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleExport}
        >
          Tạo mới
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'Code', label: 'Văn bản' },
                  { id: 'Abstract', label: 'Trích yếu' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {documents.map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.code}
                    abstract={row.abstract}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(event) => handleClick(event, row.id)}
                  />
                ))}
                {/* {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))} */}

                {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                /> */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
