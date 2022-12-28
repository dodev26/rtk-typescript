import * as React from 'react';
import Box from '@mui/material/Box';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import AddEditPage from './pages/AddEditPage';
import { useAppDispatch } from 'app/hooks';
import { fetchCityList } from 'features/city/citySlice';

export default function StudentFeature() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCityList());
  }, [dispatch]);
  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage />
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>
        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
}
