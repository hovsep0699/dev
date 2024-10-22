import React from 'react';
import styled from 'styled-components';
import { ICO } from '@distate/components';
import Core from '@distate/core/dist/application/Core';

import ExitButton from './ExitButton';
import LogoButton from './LogoButton';
import GlobalNav from './GlobalNav';
import GlobalNavItem from './GlobalNavItem';
import {
  DOCUMENT,
  CABINET,
  SYSTEM,
  CONTRACTOR,
  TARIFF,
  COMPANY_DETAILS,
  CONTRACTS,
  FINANCE_INFORMATION, POA
} from '../Url';

const HTMLBody = styled.div(() => {
  return {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    bottom: 75,
    overflowY: 'auto'
  };
});

const Menu = () => {
  const isOneUser = !!Core.user;
  const isComplete = Core.company && Core.company.isComplete;
  const logoBtnPath = isComplete || isOneUser ? '/' : COMPANY_DETAILS;

  return (
    <div id="header">
      <LogoButton path={logoBtnPath} />
      <HTMLBody>
        {(isComplete || isOneUser) && (
          <GlobalNav>
            {process.env.REACT_APP_FEATURE === 'contracts' && (
              <GlobalNavItem
                  path={CONTRACTS}
                  title="Договоры"
                  icon={ICO.write}
                  roles={[
                    'ROLE_USER'
                  ]}
              />
            )}
            <GlobalNavItem
              path={DOCUMENT}
              title="Документы"
              icon={ICO.files}
              roles={[
                'ROLE_USER'
              ]}
            />
            <GlobalNavItem
                path={POA}
                title="МЧД"
                icon={ICO.files}
                roles={[
                  'ROLE_USER'
                ]}
            />
            <GlobalNavItem path={CABINET} title="Кабинет" icon={ICO.user} />
            <GlobalNavItem
              path={COMPANY_DETAILS}
              title="Компания"
              icon={ICO.bag}
              roles={[
                'ROLE_EMPLOYEE_VIEWER',
                'ROLE_COMPANY_EDITOR',
                'ROLE_RIGHTS_VIEWER',
                'ROLE_DIVISION_VIEWER'
              ]}
            />
            <GlobalNavItem
              path={SYSTEM}
              title="Система"
              icon={ICO.package}
              roles={['ROLE_CLIENT_VIEWER', 'ROLE_CNO']}
            />
            <GlobalNavItem
              path={CONTRACTOR}
              title="Контрагенты"
              icon={ICO.bookmark}
              roles={['ROLE_CONTRACTOR_VIEWER']}
            />
            {Core.company && (
              <GlobalNavItem
                path={`${FINANCE_INFORMATION}/${Core.company.localId}`}
                title="Финансы"
                icon={ICO.wallet}
                roles={['ROLE_FINANCIAL_INFORMATION']}
              />
            )}
            <GlobalNavItem
              path={TARIFF}
              title="Тарифы"
              icon={ICO.briefcase}
              roles={['ROLE_TARIFF']}
            />
          </GlobalNav>
        )}
      </HTMLBody>
      <ExitButton />
    </div>
  );
};

export default Menu;
