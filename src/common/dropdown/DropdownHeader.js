import React from 'react';
import PropTypes from 'prop-types';

const DropdownHeader = props => {
  return <div className="dropdown-header">{props.children}</div>;
};

DropdownHeader.propTypes = {
  children: PropTypes.node.isRequired
};

export default DropdownHeader;
