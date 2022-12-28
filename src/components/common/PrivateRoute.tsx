import * as React from 'react';
import { Redirect } from 'react-router-dom';

export interface PrivateRouteProps {
  component: any;
}

export function PrivateRoute({ component: Component }: any): any {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Component />;
}
