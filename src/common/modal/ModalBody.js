import React from 'react';
import PropTypes from 'prop-types';

const Body = props => {
  return <div>{props.children}</div>;
};

Body.propTypes = {
  overflow: PropTypes.bool
};

export default Body;
