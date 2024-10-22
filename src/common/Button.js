import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ICON } from '@distate/components';

export const PRIMARY = 'color-primary';
export const SECONDARY = 'color-secondary';

const Button = ({ iconClass, colorClass, className, children, busy, ...rest }) => {
  let buttonClasses = classNames(
    {
      'ds-button': true,
      solid: !children,
      [colorClass]: true,
      [iconClass]: true,
      progress: busy
    },
    className
  );

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  colorClass: '',
  iconClass: ICON.default
};

Button.propTypes = {
  colorClass: PropTypes.oneOf([PRIMARY, SECONDARY, '']),
  iconClass: PropTypes.oneOf(Object.values(ICON)),
  busy: PropTypes.bool
};

export default Button;
