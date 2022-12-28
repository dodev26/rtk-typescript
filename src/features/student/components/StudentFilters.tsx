import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { City, ListParams } from 'models';
import { Search } from '@mui/icons-material';
import React, { ChangeEvent } from 'react';

export interface StudentFiltersProps {
  filter: ListParams;
  onChange: (newFilter: ListParams) => void;
  onSearchChange: (newFilter: ListParams) => void;
  cityList: City[];
}
export default function StudentFilters({ filter, onChange, onSearchChange, cityList }: any) {
  const searchRef = React.useRef<HTMLInputElement>();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value,
    };
    onChange(newFilter);
  };
  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;
    const value = e.target.value;
    console.log(value);
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc') || 'desc' || undefined,
    };

    onChange(newFilter);
  };
  const handleClearFilters = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">Search</InputLabel>
            <Input
              onChange={handleSearchChange}
              id="standard-adornment-amount"
              inputRef={searchRef}
              endAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter By City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter.city || ''}
              label="Age"
              onChange={handleCityChange}
            >
              <MenuItem value={undefined}>
                <em>All</em>
              </MenuItem>
              {cityList.map((item: City) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter By City</InputLabel>
            <Select
              labelId="sortBy"
              id="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              label="sort"
              onChange={handleSortChange}
            >
              <MenuItem value={''}>
                <em>No sort</em>
              </MenuItem>
              <MenuItem value={'name.asc'}>
                <em>Name ASC</em>
              </MenuItem>
              <MenuItem value={'name.desc'}>
                <em>Name DESC</em>
              </MenuItem>
              <MenuItem value={'mark.asc'}>
                <em>MARK ASC</em>
              </MenuItem>
              <MenuItem value={'mark.desc'}>
                <em>MARK DESC</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={1}>
          <Button onClick={handleClearFilters} variant="outlined" color="secondary">
            CLEAR
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
