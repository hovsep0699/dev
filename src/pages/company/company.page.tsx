import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../../common/Layout';
import { routes, initialRoutes } from './helpers/company.routes';

import {
  COMPANY_DETAILS,
  COMPANY_ADDRESS,
  COMPANY_CONNECTORS,
  COMPANY_CONNECTOR,
  COMPANY_STAFF,
  COMPANY_STAFF_WAITING,
  COMPANY_STAFF_DEACTIVATED,
  COMPANY_EMPLOYEES_ROLES,
  COMPANY_DIVISIONS
} from '../../common/Url';
import { CompanyDetails, Address, Connectors, Staff } from './components';
import { history } from '../../App';
import { Connector } from './components/connectors';
import { Waiting } from './components/staff/waiting';
import { Deactivated } from './components/staff/deactivated';
import { Roles } from './components/roles';
import { Divisions } from './components/divisions';

/* Компания */
export const CompanyPage: React.FC<RouteComponentProps> = () => {
  const isConnectorPage = history.location.pathname === COMPANY_CONNECTORS;
  const containerClassName = isConnectorPage ? 'connector-container-wrapper' : undefined;

  /** флаг незаполненных обязательных данных для регистрации */
  const hasIncopleteRole = useSelector((state: any) => state.sign.hasRoleIncomplete);
  const currentRoutes = hasIncopleteRole ? initialRoutes : routes;

  return (
    <Layout
      config={currentRoutes}
      pageMenuHeader="Компания"
      /** редирект при первом заходе в раздел */
      mainCategoryRedirect={COMPANY_DETAILS}
      /** кастомное имя класса */
      containerClassName={containerClassName}
    >
      <Switch>
        <Route path={COMPANY_DETAILS} component={CompanyDetails} exact />
        <Route path={COMPANY_ADDRESS} component={Address} exact />
        <Route path={COMPANY_CONNECTORS} component={Connectors} exact />
        <Route path={COMPANY_CONNECTOR} component={Connector} exact />
        <Route path={COMPANY_STAFF} component={Staff} exact />
        <Route path={COMPANY_STAFF_WAITING} component={Waiting} exact />
        <Route path={COMPANY_STAFF_DEACTIVATED} component={Deactivated} exact />
        <Route path={COMPANY_EMPLOYEES_ROLES} component={Roles} exact />
        <Route path={COMPANY_DIVISIONS} component={Divisions} exact />
        <Route path={COMPANY_DETAILS} component={CompanyDetails} exact />
      </Switch>
    </Layout>
  );
};
