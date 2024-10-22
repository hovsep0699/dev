import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import Layout from '../../common/Layout';
import {
  FINANCE_INFORMATION,
  FINANCE_TRANSACTION_HISTORY,
  FINANCE_TARIFF_HISTORY
} from '../../common/Url';
import { Information, TransactionsHistory, TariffHistory } from './components';
import { getRoutes } from './helpers/finance.routes';
import Core from '@distate/core/dist/application/Core';

/* Финансы */
export const FinancePage: React.FC<RouteComponentProps> = () => {
  const id = Core.company.localId;
  const routes = getRoutes(Number(id));

  return (
    <Layout
      config={routes}
      pageMenuHeader="Финансы"
      mainCategoryRedirect={`${FINANCE_INFORMATION}/${id}`}
    >
      <Switch>
        <Route path={`${FINANCE_INFORMATION}/:id`} component={Information} exact />
        <Route path={`${FINANCE_TRANSACTION_HISTORY}/:id`} component={TransactionsHistory} exact />
        <Route path={`${FINANCE_TARIFF_HISTORY}/:id`} component={TariffHistory} exact />
      </Switch>
    </Layout>
  );
};
