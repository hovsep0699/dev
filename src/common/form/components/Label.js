import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LEFT, TOP } from '../../Placement';

const Label = props => {
  const { title, align, isVisible, customClasses, isRequired } = props;
  const classes = classNames(
    {
      'ds-field-name': true,
      leftside: align === LEFT,
      top: align === TOP,
      required: isRequired
    },
    customClasses
  );
  return isVisible ? <label className={classes}>{title}</label> : null;
};

Label.defaultProps = {
  title: '',
  align: LEFT,
  isVisible: true,
  customClasses: '',
  isRequired: false
};
Label.propTypes = {
  title: PropTypes.string,
  align: PropTypes.oneOf([LEFT, TOP]),
  isVisible: PropTypes.bool,
  customClasses: PropTypes.string,
  isRequired: PropTypes.bool
};

export default Label;
