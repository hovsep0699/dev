import {
  CONTRACTOR_GROUP,
  CONTRACTOR_INVITE_YOU,
  CONTRACTOR_WAITING_ANSWER,
  CONTRACTOR_COMPANIES,
  CONTRACTOR_PERSONS,
  CONTRACTOR_INVITE
} from '../../../common/Url';

import { IRoute } from '../../../types/routes';

/** для ЮЛ */
export const companyRoutes: IRoute[] = [
  {
    path: CONTRACTOR_INVITE
  },
  {
    title: 'Юридические лица',
    path: CONTRACTOR_COMPANIES,
    exact: true
  },
  {
    title: 'Физические лица',
    path: CONTRACTOR_PERSONS,
    exact: true
  },
  {
    title: 'Приглашают вас',
    path: CONTRACTOR_INVITE_YOU,
    exact: true
  },
  {
    title: 'Ожидают ответа',
    path: CONTRACTOR_WAITING_ANSWER,
    exact: true
  },
  {
    title: 'Группы',
    path: CONTRACTOR_GROUP,
    exact: true
  }
];

/** для ФЛ */
export const personRoutes: IRoute[] = [
  {
    path: CONTRACTOR_INVITE
  },
  {
    title: 'Юридические лица',
    path: CONTRACTOR_COMPANIES,
    exact: true
  },
  {
    title: 'Физические лица',
    path: CONTRACTOR_PERSONS,
    exact: true
  },
  {
    title: 'Приглашают вас',
    path: CONTRACTOR_INVITE_YOU,
    exact: true
  },
  {
    title: 'Ожидают ответа',
    path: CONTRACTOR_WAITING_ANSWER,
    exact: true
  }
];
