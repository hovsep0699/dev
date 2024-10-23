import React from 'react';
import PropTypes from 'prop-types';
import { StyledBadge, StyledBadgeInner } from './Badge.styles';

export const BadgePropTypes = {
  digit: PropTypes.number.isRequired
};

export type BadgePropTypes = PropTypes.InferProps<typeof BadgePropTypes> & {
  children: React.ReactElement;
};

const Badge = ({ digit, children, ...rest }: BadgePropTypes) => (
  <StyledBadge>
    {React.cloneElement(children, { ...rest })}
    {digit > 0 ? <StyledBadgeInner>{digit}</StyledBadgeInner> : null}
  </StyledBadge>
);

Badge.propTypes = BadgePropTypes;

export default Badge;
