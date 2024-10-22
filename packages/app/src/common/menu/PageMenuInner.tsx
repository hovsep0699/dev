import React from 'react';
import SecurityService from '@distate/core/dist/application/security/SecurityService';
import PageMenu from './PageMenu';
import PageMenuItem from './PageMenuItem';
import { IRoute } from '../../types/routes';

interface IRouteWithTitle extends IRoute {
  title: string;
}

const PageMenuInner = ({ config }: any) =>
  config
    .filter((item: IRoute) => item.title)
    .map((item: IRouteWithTitle, index: number) => {
      const hasRole = Boolean(item.roles);
      const isVisible = !hasRole || item.roles?.some(role => SecurityService.hasRole(role));

      if (!isVisible) {
        return null;
      }

      if (item.submenu) {
        return (
          <PageMenuItem
            key={index}
            path={item.link || item.path}
            title={item.title}
            exact={item?.exact}
          >
            <PageMenu>
              <PageMenuInner config={item.submenu} />
            </PageMenu>
          </PageMenuItem>
        );
      } else {
        return (
          <PageMenuItem
            key={index}
            path={item.link || item.path}
            title={item.title}
            exact={item?.exact}
          />
        );
      }
    });

export default PageMenuInner;
