import { IRoute } from '../../../types/routes';
import {
  CABINET_EMPLOYEE,
  CABINET_NOTIFICATION,
  CABINET_CERTIFICATE,
  CABINET_PERSON,
  CABINET_PERSON_BANK, CABINET_PERSON_CERTIFICATE
} from '../../../common/Url';

export const routes: IRoute[] = [
  {
    title: 'Пользователь',
    path: CABINET_EMPLOYEE,
    exact: true
  },
  {
    title: 'Оповещения',
    path: CABINET_NOTIFICATION,
    exact: true
  },
  {
    title: 'Сертификаты',
    path: CABINET_CERTIFICATE,
    exact: false
  }
];


export const naturalRoutes: IRoute[] = [
  {
    title: 'Пользователь',
    path: CABINET_PERSON,
    exact: false
  },
  {
    title: 'Банк',
    path: CABINET_PERSON_BANK,
    exact: false
  },
  {
    title: 'Оповещения',
    path: CABINET_NOTIFICATION,
    exact: true
  },
  {
    title: 'Сертификаты',
    path: CABINET_PERSON_CERTIFICATE,
    exact: false
  }
];