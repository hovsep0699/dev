import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Core from '@distate/core/dist/application/Core';
import { AUTH_CERT } from '../../common/Url';

const ExternalRoute = ({ path, ...rest }) => {
  return (
    <Route
      {...rest}
      path={path}
      component={props => {
        const { location } = props;
        if (Core.isAuthed()) {
          window.location = location.pathname;
          return null;
        }

        return (
          <Redirect
            to={{
              pathname: AUTH_CERT,
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

ExternalRoute.propTypes = {
  path: PropTypes.string.isRequired
};

export default ExternalRoute;
