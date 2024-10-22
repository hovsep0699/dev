import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Button, ButtonKinds } from '@distate/components';
import Core from '@distate/core/dist/application/Core';

import Layout from '../../common/Layout';
import { companyRoutes, personRoutes } from './helpers/contractors.routes';
import { history } from '../../App';
import {
  CONTRACTOR_INVITE,
  CONTRACTOR_INVITE_YOU,
  CONTRACTOR_WAITING_ANSWER,
  CONTRACTOR_COMPANIES,
  CONTRACTOR_PERSONS,
  CONTRACTOR_GROUP
} from '../../common/Url';
import {
  InviteContractor,
  InviteYouContractor,
  WaitingAnswerContractor,
  NaturalEntityContractor,
  LegalEntityContractor,
  ContractorGroups
} from './components';
import { getOperators } from './store/actions';
import './style.css';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

/* Контрагенты */
export const ContractorsPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    Core?.company && dispatch(getOperators());
  }, [dispatch]);

  const topMenuButton = (
    <ButtonWrapper>
      <Button onClick={() => history.push(CONTRACTOR_INVITE)} kind={ButtonKinds.Primary}>
        Пригласить контрагента
      </Button>
    </ButtonWrapper>
  );

  /** список роутов в зависимости от типа пользователя - ФЛ или ЮЛ */
  const routes = Core?.company ? companyRoutes : personRoutes;

  return (
    <Layout
      config={routes}
      pageMenuHeader="Контрагенты"
      menuTopFragment={topMenuButton}
      /** редирект при первом заходе в раздел */
      mainCategoryRedirect={CONTRACTOR_COMPANIES}
    >
      <Switch>
        <Route path={CONTRACTOR_INVITE} component={InviteContractor} exact />
        <Route path={CONTRACTOR_INVITE_YOU} component={InviteYouContractor} exact />
        <Route path={CONTRACTOR_WAITING_ANSWER} component={WaitingAnswerContractor} exact />
        <Route path={CONTRACTOR_COMPANIES} component={LegalEntityContractor} exact />
        <Route path={CONTRACTOR_PERSONS} component={NaturalEntityContractor} exact />
        <Route path={CONTRACTOR_GROUP} component={ContractorGroups} exact />
      </Switch>
    </Layout>
  );
};
