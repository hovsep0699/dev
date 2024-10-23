import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import Layout from '../../common/Layout';
import { NEW_UNFORMALIZED } from '../../common/Url';
import { CreateUnformalized } from './components';

/* Создать из файла */
export const CreateUnformalizedPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout topBarHeading="Создание неформализованного документа">
      <Switch>
        <Route path={NEW_UNFORMALIZED} component={CreateUnformalized} exact />
      </Switch>
    </Layout>
  );
};
