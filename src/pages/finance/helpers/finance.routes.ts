import {
  FINANCE_INFORMATION,
  FINANCE_TRANSACTION_HISTORY,
  FINANCE_TARIFF_HISTORY
} from '../../../common/Url';

export const getRoutes = (id?: number) => {
  if (id) {
    return [
      {
        title: 'Информация',
        path: `${FINANCE_INFORMATION}/:id`,
        link: `${FINANCE_INFORMATION}/${id}`,
        exact: true
      },
      {
        title: 'История транзакций',
        path: `${FINANCE_TRANSACTION_HISTORY}/:id`,
        link: `${FINANCE_TRANSACTION_HISTORY}/${id}`,
        exact: true
      },
      {
        title: 'История тарифов',
        path: `${FINANCE_TARIFF_HISTORY}/:id`,
        link: `${FINANCE_TARIFF_HISTORY}/${id}`,
        exact: true
      }
    ];
  }
};
