import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import Layout from '../../common/Layout';
import { MAIN } from '../../common/Url';
import { Main } from './components';

/* Главная страница */
export const MainPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Добро пожаловать!">
      <Switch>
        <Route path={`${MAIN}`} component={Main} exact />
      </Switch>
    </Layout>
  );
};
