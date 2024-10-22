import React from 'react';
import { DestinationType, ContractorTypes } from '../../helpers/contractors.typings';
import {
  PersonSearchTable,
  LocalCompanySearchTable,
  LocalRoamingCompanySearchTable
} from './tables';

interface Props {
  destinationType: DestinationType;
  contractorType: ContractorTypes;
}

/** компонент для выбора подходящей таблицы */
export const ChooseTable = (props: Props) => {
  const { destinationType, contractorType } = props;

  let CompanyTable;
  /** Подставление компонента в зависимости от направления поиска */
  switch (destinationType) {
    /** ЮЛ - Локально */
    case DestinationType.Local:
      CompanyTable = <LocalCompanySearchTable />;
      break;
    /** ЮЛ - Локальный роуминг */
    case DestinationType.LoaclRoaming:
      CompanyTable = <LocalRoamingCompanySearchTable />;
      break;
    default:
      CompanyTable = null;
  }

  return (
    <>{contractorType === ContractorTypes.legal_entity ? CompanyTable : <PersonSearchTable />}</>
  );
};
