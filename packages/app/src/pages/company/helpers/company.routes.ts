import {
  COMPANY_DETAILS,
  COMPANY_ADDRESS,
  COMPANY_CONNECTORS,
  COMPANY_CONNECTOR,
  COMPANY_STAFF,
  COMPANY_STAFF_WAITING,
  COMPANY_STAFF_DEACTIVATED,
  COMPANY_EMPLOYEES_ROLES,
  COMPANY_DIVISIONS
} from '../../../common/Url';

import { IRoute } from '../../../types/routes';

export const routes: IRoute[] = [
  {
    title: 'Реквизиты компании',
    path: COMPANY_DETAILS,
    exact: true
  },
  {
    title: 'Юридический адрес',
    path: COMPANY_ADDRESS,
    exact: true
  },
  {
    title: 'Коннектор',
    path: COMPANY_CONNECTORS,
    exact: false,
    roles: ['ROLE_CONNECTOR_OPERATOR']
  },
  {
    title: 'Сотрудники',
    path: COMPANY_STAFF,
    exact: true,
    roles: ['ROLE_EMPLOYEE_VIEWER'],
    submenu: [
      {
        title: 'Заявки на активацию',
        path: COMPANY_STAFF_WAITING,
        exact: true
      },
      {
        title: 'Отключенные',
        path: COMPANY_STAFF_DEACTIVATED,
        exact: true
      }
    ]
  },
  {
    title: 'Роли сотрудников',
    path: COMPANY_EMPLOYEES_ROLES,
    exact: true,
    roles: ['ROLE_RIGHT_VIEWER']
  },
  {
    title: 'Подразделения',
    path: COMPANY_DIVISIONS,
    exact: true,
    roles: ['ROLE_DIVISION_VIEWER']
  },
  {
    path: COMPANY_CONNECTOR
  }
];

export const initialRoutes: IRoute[] = [
  {
    title: 'Реквизиты компании',
    path: COMPANY_DETAILS,
    exact: true
  },
  {
    title: 'Юридический адрес',
    path: COMPANY_ADDRESS,
    exact: true
  }
];
