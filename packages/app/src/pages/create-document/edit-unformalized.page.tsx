import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import Layout from '../../common/Layout';
import { EDIT_UNFORMALIZED } from '../../common/Url';
import { EditUnformalized } from './components';

/* редактирование неформализованного файла */
export const EditUnformalizedPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout topBarHeading="Редактирование неформализованного документа">
      <Switch>
        <Route path={EDIT_UNFORMALIZED} component={EditUnformalized} exact />
      </Switch>
    </Layout>
  );
};
