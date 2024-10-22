import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Layout from '../../common/Layout';
import { Tariff } from './components';

/* Тарифы */
export const TariffPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout pageMenuHeader="Тарифы" topBarHeading={'Тарифы'}>
      <Tariff />
    </Layout>
  );
};
