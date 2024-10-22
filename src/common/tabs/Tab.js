import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tab = props => {
  const tabClasses = classNames({
    tab: true,
    active: props.isActive
  });
  return (
    <React.Fragment>
      <div className={tabClasses} onClick={() => props.onClick(props.label)}>
        {props.label}
      </div>
    </React.Fragment>
  );
};

Tab.defaultProps = {
  isActive: false,
  onClick: () => {}
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

export default Tab;
