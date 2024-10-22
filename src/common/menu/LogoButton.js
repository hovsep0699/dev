import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const LogoButton = ({ path }) => {
  return <NavLink to={path} className="h-logo" tabIndex={-1} />;
};

LogoButton.propTypes = {
  path: PropTypes.string.isRequired
};

export default LogoButton;
