import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ProgressbarNode.module.css';

const ProgressbarNode = ({ title, isActive, ...rest }) => {
  const classes = classNames({
    'progressbar-node': true,
    active: isActive
  });
  return (
    <div className={classes} {...rest}>
      <span>{title}</span>
    </div>
  );
};

ProgressbarNode.defaultProps = {
  isActive: false
};
ProgressbarNode.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

export default ProgressbarNode;
