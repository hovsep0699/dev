import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ICO } from '@distate/components';
import SecurityService from '@distate/core/dist/application/security/SecurityService';

const GlobalNavItem = props => {
  const iconClasses = classNames({
    ico: true,
    [props.icon]: true
  });
  const isGranted =
    (props.roleCheckFn && props.roleCheckFn()) ||
    props.roles.length === 0 ||
    props.roles.some(role => SecurityService.hasRole(role));

  return isGranted ? (
    <li>
      <Link to={props.path} className="h-item" tabIndex={-1}>
        <i className={iconClasses}></i>
        <p className="caption">{props.title}</p>
      </Link>
    </li>
  ) : null;
};

GlobalNavItem.defaultProps = {
  roles: [],
  legacyRoute: '',
  roleCheckFn: null
};

GlobalNavItem.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(Object.values(ICO)),
  roles: PropTypes.array,
  roleCheckFn: PropTypes.func
};

export default GlobalNavItem;
