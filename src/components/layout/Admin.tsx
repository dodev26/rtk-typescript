import { Box, makeStyles } from '@material-ui/core';
import Header from 'components/common/Header';
import Sidebar from 'components/common/Sidebar';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

export interface AdminLayoutProps {}
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  grid: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '300px 1fr',
    height: '100%',
  },
  header: {
    backgroundColor: 'blue',
  },
  sidebar: {
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    height: '100vh',
  },
  main: {
    height: '100%',
    padding: theme.spacing(2, 3),
  },
}));
export function AdminLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.grid}>
        <Box className={classes.sidebar}>
          <Sidebar />
        </Box>
        <Box className={classes.main}>
          <Switch>
            <Route path="/admin/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin/students">
              <StudentFeature />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Box>
  );
}
