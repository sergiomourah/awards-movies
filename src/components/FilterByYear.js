import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, TextField } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    margin: theme.spacing(2),
  },
  formControl: {
    marginRight: theme.spacing(1),
    width: 800
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const FilterByYear = ({ onSearch }) => {
  const classes = useStyles();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSearch = () => {
    onSearch(selectedYear);
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Search by year"
        value={selectedYear}
        className={classes.formControl}
        onChange={(event) => setSelectedYear(event.target.value)}
        id="outlined-size-small"
        type="number"
        defaultValue="Small"
        size="small"
      />
      <Button
        className={classes.iconButton}
        onClick={handleSearch}
      >
        <IconButton aria-label="delete" size="small">
          <SearchIcon fontSize="small" />
        </IconButton>
      </Button>

    </div>
  );
};

export default FilterByYear;
