import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function renderSubmenu(children: any) {
  const child = Children.count(children) > 0 && Children.only(children);
  return child ? cloneElement(child, { isSubmenu: true }) : null;
}

export const PageMenuItemPropTypes = {
  exact: PropTypes.bool,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export type PageMenuTypes = PropTypes.InferProps<typeof PageMenuItemPropTypes> & {
  children?: React.ReactNode;
};

const PageMenuItem = ({ title, exact = true, path, children = null, ...rest }: PageMenuTypes) => {
  const isLegacyRoute = path.includes('#');

  if (isLegacyRoute) {
    return (
      <li>
        <a className="menu-item" tabIndex={-1} href={path}>
          {title}
        </a>
        {renderSubmenu(children)}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        exact={!!exact}
        to={path}
        className="menu-item"
        activeClassName="active"
        tabIndex={-1}
        {...rest}
      >
        {title}
      </NavLink>
      {renderSubmenu(children)}
    </li>
  );
};

PageMenuItem.propTypes = PageMenuItemPropTypes;

export default PageMenuItem;
