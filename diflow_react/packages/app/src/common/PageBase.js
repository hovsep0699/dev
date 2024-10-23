import React, { Component } from 'react';
import PageMenu from '../common/menu/PageMenu';
import PageMenuItem from '../common/menu/PageMenuItem';
import Container from '../common/Container';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Footer } from '@distate/components';
import autobind from 'autobind-decorator';
import Menu from './menu/Menu';

function renderComponentRoutes(config, componentType) {
  return config.map((route, index) => {
    if (route.submenu) {
      return (
        <React.Fragment key={route.path}>
          <Route path={route.path} exact component={route[componentType]} />
          {route.submenu && renderComponentRoutes(route.submenu, componentType)}
        </React.Fragment>
      );
    } else {
      return (
        <Route
          key={route.path + index}
          path={route.path}
          exact={route.exact}
          component={route[componentType]}
        />
      );
    }
  });
}

class PageBase extends Component {
  @autobind
  renderPageMenu(config, header) {
    return (
      <PageMenu header={header}>
        {config.map((item, index) => {
          if (item.submenu) {
            return (
              <PageMenuItem
                key={index}
                path={item.path}
                exact={item.exact}
                title={item.pageMenuTitle}
              >
                {this.renderPageMenu(item.submenu)}
              </PageMenuItem>
            );
          } else {
            return (
              <PageMenuItem
                key={index}
                path={item.path}
                exact={item.exact}
                title={item.pageMenuTitle}
              />
            );
          }
        })}
      </PageMenu>
    );
  }

  @autobind
  renderTopBar(config) {
    return <Switch>{renderComponentRoutes(config, 'topbar')}</Switch>;
  }

  @autobind
  renderContent(config) {
    const { pathname } = this.props.location;
    const conf = config.find(item => item.path === pathname) || {};
    const { className } = conf;

    return (
      <div className="wrap" id="wrap">
        <Container className={className}>
          <Switch>{renderComponentRoutes(config, 'content')}</Switch>
        </Container>
        <Footer hasIncreasedIndent={config.length > 1} />
      </div>
    );
  }

  @autobind
  renderPage(config, pageMenuHeader, redirectParams = { path: '', to: '' }) {
    const page = [];
    if (redirectParams.path && redirectParams.to) {
      page.push(
        <Route
          key={redirectParams.path + redirectParams.to}
          exact
          path={redirectParams.path}
          render={() => <Redirect to={redirectParams.to} />}
        />
      );
    }

    page.push(<Menu key="menu" />);
    page.push(this.renderPageMenu(config, pageMenuHeader));
    page.push(this.renderTopBar(config));
    page.push(this.renderContent(config));

    return page;
  }

  render() {
    return <span>Must be rendered in subclass</span>;
  }
}

export default PageBase;
