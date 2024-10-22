import React from 'react';
import PropTypes from 'prop-types';

const DropdownItem = props => {
  return <li onClick={props.handleClick(() => props.onSelect(props.itemKey))}>{props.children}</li>;
};

DropdownItem.defaultProps = {
  onSelect: () => {},
  handleClick: null
  //TODO handleClick - ф-ция, которая генерируется компонентом Dropdown
  // и автоматически присваивается потомкам компонента DropdownMenu,
  // поэтому она никогда не окажется null,
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  itemKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onSelect: PropTypes.func,
  handleClick: PropTypes.func
};

export default DropdownItem;
