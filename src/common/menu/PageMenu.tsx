import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Folder from '../../container/folder';

import { DOCUMENT } from '../Url';

const MenuTitle = styled.h1`
  color: ${({ theme }) => theme.main.color.white};
  font-size: ${({ theme }) => theme.main.font.size.h1};
  font-weight: 300;
  margin-bottom: 36px;
  padding: 24px 0 0 32px;
`;

export const PageMenuPropTypes = {
  header: PropTypes.string,
  isSubmenu: PropTypes.bool,
  topFragment: PropTypes.element
};

export type PageMenuTypes = PropTypes.InferProps<typeof PageMenuPropTypes> & {
  children: React.ReactNode;
};

/**
 * Page side navigation
 * @param children Should be PageMenuInner component
 */
const PageMenu = ({ header = '', isSubmenu = false, children, topFragment }: PageMenuTypes) => {
  return isSubmenu ? (
    <ul className="menu-submenu">{children}</ul>
  ) : (
    <div className="menu">
      <MenuTitle>{header}</MenuTitle>
      {topFragment}
      <ul className="menu-items">{children}</ul>
      <Switch>
        <Route path={DOCUMENT} component={Folder} />
      </Switch>
    </div>
  );
};

PageMenu.propTypes = PageMenuPropTypes;

export default PageMenu;
