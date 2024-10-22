import React from 'react';
import PropTypes from 'prop-types';

const DropdownMenu = props => {
  const children = React.Children.map(props.children, child =>
    React.cloneElement(child, {
      handleClick: props.handleClick,
      onSelect: props.onSelect
    })
  );
  return <ul>{children}</ul>;
};

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func
};

export default DropdownMenu;
