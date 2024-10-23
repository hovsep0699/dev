import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import Layout from '../../common/Layout';
import {naturalRoutes, routes} from './helpers/cabinet.routes';

import {
    CABINET_EMPLOYEE,
    CABINET_PERSON,
    CABINET_NOTIFICATION,
    CABINET_CERTIFICATE,
    CABINET_PERSON_BANK,
    CABINET_PERSON_CERTIFICATE
} from '../../common/Url';
import { Employee, Notification, Certificate } from './components';
import Core from '@distate/core/dist/application/Core';

/* Кабинет */
export const CabinetPage: React.FC<RouteComponentProps> = () => {
  if (Core.company) {
    return (
        <Layout
            config={routes}
            pageMenuHeader="Кабинет"
            /** редирект при первом заходе в раздел */
            mainCategoryRedirect={CABINET_EMPLOYEE}
        >
          <Switch>
            <Route path={CABINET_EMPLOYEE} component={Employee} exact />
            <Route path={CABINET_NOTIFICATION} component={Notification} exact />
            <Route path={CABINET_CERTIFICATE} component={Certificate} exact />
          </Switch>
        </Layout>
    );
  } else {
      if (window.location.pathname === '/cabinet') {
          window.location.href = CABINET_PERSON
      }
      return (
          <Layout
              config={naturalRoutes}
              pageMenuHeader="Кабинет"
              /** редирект при первом заходе в раздел */
              mainCategoryRedirect={CABINET_PERSON}
          >
              <Switch>
                  <Route path={CABINET_PERSON} />
                  <Route path={CABINET_PERSON_BANK} />
                  <Route path={CABINET_NOTIFICATION} component={Notification} exact />
                  <Route path={CABINET_PERSON_CERTIFICATE} />
              </Switch>
          </Layout>
      )
  }
};
