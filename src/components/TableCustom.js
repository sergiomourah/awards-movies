import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination, Select, Stack, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

export default function TableCustom({
  rows,
  labels,
  pagination = false,
  page,
  setPage,
  totalElements,
  selectedYear,
  setSelectedYear,
  winnerSelected,
  setWinnerSelected,
}) {
  const numPages = Math.ceil(totalElements / 15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event) => {
    setWinnerSelected(event.target.value);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
          <TableHead>
            {pagination === true && (
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <TextField
                    label="Filter Year"
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(event.target.value)}
                    id="outlined-size-small"
                    type="number"
                    size="small"
                    style={{ width: "120px" }}
                  />
                </TableCell>
                <TableCell align="right" colSpan={4}>
                  <Box sx={{ minWidth: 20 }}>
                    <FormControl style={{ width: "160px" }}>
                      <InputLabel id="winnerSelected">Filter Winner</InputLabel>
                      <Select
                        labelId="winnerSelectedl"
                        id="winnerSelected"
                        value={winnerSelected}
                        label="Filter Winner"
                        size="small"
                        onChange={handleChange}
                      >
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              {labels.map((label, index) => (
                <TableCell key={index} align="left">
                  <b>{label.name}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {labels.map((label, index) => (
                  <TableCell key={index} align="left">
                    {row[label.column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination === true && (
        <Stack spacing={5} justifyContent="center" mt={2}>
          <Pagination
            count={numPages}
            page={page}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </React.Fragment>
  );
}
