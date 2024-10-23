import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import Layout from '../../common/Layout';
import { CREATE_FROM_FILE } from '../../common/Url';
import { CreateFromFile } from './components';

/* Создать из файла */
export const CreateFromFilePage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout topBarHeading="Создание документа из файла">
      <Switch>
        <Route path={CREATE_FROM_FILE} component={CreateFromFile} exact />
      </Switch>
    </Layout>
  );
};
