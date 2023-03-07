import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination, Stack } from '@mui/material';

export default function TableCustom({ rows, labels, pagination = false, page, setPage, totalElements }) {

  const numPages = Math.ceil(totalElements / 15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {labels.map((label, index) => (
              <TableCell key={index} align="left"><b>{label.name}</b></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {labels.map((label, index) => (
                <TableCell key={index} align="left">{row[label.column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {pagination === true &&
        (<Stack spacing={5} justifyContent="center" mt={2}>
          <Pagination
            count={numPages}
            page={page}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Stack>)}
    </React.Fragment>
  );
}
