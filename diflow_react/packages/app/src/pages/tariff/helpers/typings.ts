export type DefaultState = {
  activeTariffs?: any;
  archivedTariffs?: any;
  currentTariff?: any;
  selectedTariffFlow?: any;
  tariffTypes?: TariffType[];
  tariffStatuses?: any;
  viewTariffId?: number;
  isOpenTariffCreate?: boolean;
  isOpenTariffCard?: boolean;
  tariffErrors?: any;
  isTariffEditing: boolean;
};

/** тип тарифа */
export type TariffType = {
  id: number;
  system_name: string;
  title: string;
};

/** системное имя статуса тарифа */
export enum TariffStatusSystemName {
  hidden = 'hidden',
  active = 'active',
  archive = 'archive'
}
