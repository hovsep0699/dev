import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TabContent = props => {
  const tabContentClasses = classNames({
    tabcontent: true,
    active: props.isActive
  });
  return <div className={tabContentClasses}>{props.children}</div>;
};

TabContent.defaultValues = {
  isActive: false
};

TabContent.propTypes = {
  isActive: PropTypes.bool
};

export default TabContent;
