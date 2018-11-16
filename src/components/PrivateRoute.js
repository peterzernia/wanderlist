import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (

  /*
  Users must be logged in to view Private Routes.
  */
  <Route
    {...rest}
    render={props => (
      authenticated
        ? <Component {...props} />
        : <Redirect to={{pathname: "/login"}} />
    )}
  />
);

export default PrivateRoute;
