import { Box, Button, makeStyles, TablePagination, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'apis/studentApi';
import { City, ListParams, Student } from 'models';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';

import { fetchStudentList, setFilter, setFilterWithDebounce } from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const ListPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const match = useRouteMatch();
  const { loading, list, filter, pagination } = useAppSelector((state) => state.student);
  const { list: listCity } = useAppSelector((state) => state.city);
  const selectedCityMap = listCity.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {});

  React.useEffect(() => {
    dispatch(fetchStudentList(filter));
  }, [dispatch, filter]);
  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(setFilter(newFilter));
  };
  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove((student.id as String) || '');
      dispatch(fetchStudentList({ ...filter }));
    } catch (error) {}
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer} mb={3}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>
      <Box>
        <StudentFilters
          filter={filter}
          cityList={listCity}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      <StudentTable
        loading={loading}
        cityMap={selectedCityMap}
        studentList={list}
        onRemove={handleRemoveStudent}
      />
      <Pagination
        count={Math.ceil(pagination._totalRows / pagination._limit)}
        size="small"
        page={pagination._page}
        onChange={handleChangePage}
      />
    </Box>
  );
};

export default ListPage;
