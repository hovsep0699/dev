import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Loading } from '@distate/components';
import SecurityService from '@distate/core/dist/application/security/SecurityService';

import Menu from './menu/Menu';
import PageMenu from './menu/PageMenu';
import PageMenuInner from './menu/PageMenuInner';
import { Switch, Route, Redirect } from 'react-router-dom';
import Container from './Container';
import { Footer } from '@distate/components';
import TopBar from './topbar/TopBar';
import { IRoute } from '../types/routes';
import { SingInit } from '../container/sign/sign.init';
import { history } from '../App';

const Wrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  min-height: 100vh !important;
`;

const LoadingWrapp = styled(Loading)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4000;
`;

const Wrapper = styled.div`
  padding: ${({ theme }) => `${theme.main.sizes.padding} ${theme.main.sizes.padding} 0`};
`;

interface ILayout {
  title?: string;
  config?: IRoute[];
  isLoading?: boolean;
  children?: React.ReactNode;
  pageMenuHeader?: string;
  topBarHeading?: string;
  menuTopFragment?: any;
  /** урл для перенаправления из page в категорию при первом заходе в раздел */
  mainCategoryRedirect?: string;
  /** кастомное имя класса */
  containerClassName?: string;
}

/** получение всех url */
const getAllUrls = (config: IRoute[]): string[] => {
  const arr: string[] = [];
  /** обходим главные подразделы */
  for (let i = 0; i < config.length; i++) {
    if (config[i]?.submenu) {
      const submenu = config[i]?.submenu;
      /** обходим вложенные разделы */
      for (let j = 0; j < submenu!.length; j++) {
        arr.push(submenu![j].link || submenu![j].path);
      }
    } else {
      arr.push(config[i].link || config[i].path);
    }
  }
  return arr;
};

/** получение линейного массива всех роутов  */
const getLineRouts = (routes: IRoute[] = []) => {
  const lineRouts: IRoute[] = [];
  routes.forEach(item => {
    lineRouts.push(item);
    if (item.submenu) {
      item.submenu.forEach(subItem => {
        lineRouts.push(subItem);
      });
    }
  });
  return lineRouts;
};

const TopBarRoute: React.FC<{ routs: IRoute[]; topBarHeading?: string }> = React.memo(
  ({ routs, topBarHeading }) => {
    const lineRouts = getLineRouts(routs);
    return (
      <Switch>
        {lineRouts.map((route: IRoute, index: number) => {
          const { path, exact, title } = route;
          return (
            <Route key={index} path={path} strict exact={exact} children={topBarHeading || title} />
          );
        })}
      </Switch>
    );
  }
);

const Layout = ({
  title,
  config,
  children,
  pageMenuHeader,
  isLoading = false,
  topBarHeading,
  menuTopFragment,
  mainCategoryRedirect,
  containerClassName
}: ILayout) => {
  const hasIncopleteRole = useSelector((state: any) => state.sign.hasRoleIncomplete);
  const allUrls = config && getAllUrls(config);
  const currentUrl = history.location.pathname;
  /** если среди роутов нет текущей страницы то редирект на основную стрницу раздела */
  const needRedirect = allUrls && !allUrls.includes(currentUrl);

  const renderMainContent = (routs: IRoute[] | undefined) => {
    /** линейный массив всех роутов  */
    const lineRouts = getLineRouts(routs);

    return routs ? (
      <Switch>
        {lineRouts.map((route: IRoute, index: number) => {
          const hasRole = Boolean(route.roles);
          const isVisible = !hasRole || route.roles?.some(role => SecurityService.hasRole(role));

          if (!isVisible) {
            return null;
          }

          return (
            <Route
              strict
              key={index}
              path={route.path}
              exact={route.exact}
              children={route.main ? <route.main /> : children}
            />
          );
        })}
        {mainCategoryRedirect && needRedirect && <Redirect to={mainCategoryRedirect} />}
      </Switch>
    ) : (
      children
    );
  };

  return (
    <>
      <SingInit />
      <Menu />

      {config && (
        <PageMenu header={pageMenuHeader} topFragment={menuTopFragment}>
          <PageMenuInner config={config} />
        </PageMenu>
      )}

      <TopBar hasIncopleteRole={hasIncopleteRole}>
        {title && title}
        {config ? <TopBarRoute routs={config} topBarHeading={topBarHeading} /> : topBarHeading}
      </TopBar>

      <Wrap className="wrap">
        <Container className={containerClassName}>
          {isLoading && <LoadingWrapp height="100vh" />}
          <Wrapper>{renderMainContent(config)}</Wrapper>
        </Container>
        <Footer hasIncreasedIndent={!!config} />
      </Wrap>
    </>
  );
};

export default Layout;
