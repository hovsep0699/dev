import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Core from '@distate/core/dist/application/Core';
import { AUTH_CERT } from '../../common/Url';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const renderComponent = props => {
    return <Component {...props} />;
  };
  const redirectToAuth = props => {
    return (
      <Redirect
        to={{
          pathname: AUTH_CERT,
          state: { from: props.location }
        }}
      />
    );
  };
  return (
    <Route
      key={rest.path}
      {...rest}
      render={props => {
        return Core.isAuthed() ? renderComponent(props) : redirectToAuth(props);
      }}
    />
  );
};

export default PrivateRoute;
