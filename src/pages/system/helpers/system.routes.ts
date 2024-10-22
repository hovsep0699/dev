import { IRoute } from '../../../types/routes';
import {
  SYSTEM_COMPANIES,
  SYSTEM_LICENSE,
  SYSTEM_CONNECTERS,
  SYSTEM_PERSONS,
  SYSTEM_REPORT
} from '../../../common/Url';

export const routes: IRoute[] = [
  {
    title: 'Лицензия',
    path: SYSTEM_LICENSE,
    exact: true
  },
  {
    title: 'Юридические лица',
    path: SYSTEM_COMPANIES,
    exact: true
  },
  {
    title: 'Физические лица',
    path: SYSTEM_PERSONS,
    exact: true
  },
  {
    title: 'Коннекторы',
    path: SYSTEM_CONNECTERS,
    exact: true
  },
  {
    title: 'Отчет',
    path: SYSTEM_REPORT,
    exact: true
  }
];
