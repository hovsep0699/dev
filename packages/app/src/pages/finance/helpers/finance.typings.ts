export type DefaultState = {
  /** признак ВКС */
  isVks?: boolean;
  companyName?: string;
  balance?: number;
  /** номер лицевого счета */
  accountNumber?: string;
  /** информация о текущем тарифе */
  currentTariff?: CurrentTariff;
  /** список видов документооборота для тарифа */
  tariffFlow?: TariffFlow;
  /** список всех тарифов */
  tariffs?: Tariffs;
  /** признак постоплаты */
  isPostpaid?: boolean;
  /** баланс тарифа */
  tariffBalance?: number;
  /** зарезервировано баланса */
  authorized?: number;
  /** история транзакций */
  transactionsHistory?: {
    recordsTotal: number;
    rows: TransactionsHistoryItem[];
  };
  tariffsHistory?: {
    recordsTotal: number;
    rows: any[];
  };
  selectedTariff?: any;
};

type Tariffs = {
  recordsTotal: number;
  rows: TariffsItem[];
};

type TariffsItem = {
  id: number;
  title: string;
  status_title: string;
  status_system_name: string;
  type_title: string;
  type_system_name: string;
  companies_counter: number;
};

export type TariffFlowItem = {
  id: number;
  flow_id: number;
  title: string;
  system_name: string;
  cost: number;
};

type TariffFlow = {
  recordsTotal: number;
  rows: TariffFlowItem[];
};

type CurrentTariff = {
  id: number;
  next_id?: any;
  from: string;
  to?: any;
  tariff_id: number;
  tariff_title: string;
  created_by: number;
  isPromotion?: boolean;
};

/** элемент истории транзакций */
export type TransactionsHistoryItem = {
  amount: number;
  comment: string;
  created_at: string;
  id: number;
  type_id: number;
  type_system_name: string;
};
