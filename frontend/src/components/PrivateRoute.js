import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (

  /*
  Users must be authenticated in to view Private Routes or else they are
  redirected to the Login Page.
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
