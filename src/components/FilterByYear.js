import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Box, IconButton, TextField } from "@mui/material";

const FilterByYear = ({ onSearch }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSearch = () => {
    onSearch(selectedYear);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        justifyContent: "left",
        margin: 2,
      }}
    >
      <TextField
        label="Search by year"
        value={selectedYear}
        sx={{ marginRight: 1, width: 800 }}
        onChange={(event) => setSelectedYear(event.target.value)}
        id="outlined-size-small"
        type="number"
        size="small"
      />
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
        onClick={handleSearch}
      >
        <IconButton aria-label="delete" size="small">
          <SearchIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FilterByYear;
