import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import Layout from '../../common/Layout';
import {
  SYSTEM_LICENSE,
  SYSTEM_REPORT,
  SYSTEM_CONNECTERS,
  SYSTEM_COMPANIES,
  SYSTEM_PERSONS
} from '../../common/Url';
import { Report, License, Connecters, Companies, Persons } from './components';
import { routes } from './helpers/system.routes';

/* Система */
export const SystemPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout config={routes} pageMenuHeader="Система" mainCategoryRedirect={SYSTEM_COMPANIES}>
      <Switch>
        <Route path={SYSTEM_LICENSE} component={License} exact />
        <Route path={SYSTEM_COMPANIES} component={Companies} exact />
        <Route path={SYSTEM_PERSONS} component={Persons} exact />

        <Route path={SYSTEM_CONNECTERS} component={Connecters} exact />
        <Route path={SYSTEM_REPORT} component={Report} exact />
      </Switch>
    </Layout>
  );
};
