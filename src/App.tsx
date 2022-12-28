import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import LoginPage from './features/auth/pages/LoginPage';
import { AdminLayout } from './components/layout/Admin';
import { NotFound, PrivateRoute } from 'components/common';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <Route path="/admin">
          <PrivateRoute component={AdminLayout} />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
