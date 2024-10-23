import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.system;

export const list = createSelector(root, state => state.list);
export const isLoadingList = createSelector(root, state => state.isLoadingList);
export const isLoadingUpdate = createSelector(root, state => state.isLoadingUpdate);

export const companyIdConnecters = createSelector(root, state => state.companyIdConnecters);

export const connecters = createSelector(root, state => state.connecters);
export const isLoadingConnecters = createSelector(root, state => state.isLoadingConnecters);

export const roamingDocumentsReport = createSelector(root, state => state.roamingDocumentsReport);

/** информация о лицензии */
export const licenseSeletor = createSelector(root, state => state.license);
/** название лицензии */
export const licenseTitleSeletor = createSelector(root, state => state.license?.type?.title);
/** дата окончания лицензии */
export const licenseValidUntilSeletor = createSelector(root, state => state.license?.validUntil);

/** информация о компании */
export const companiesSeletor = createSelector(root, state => state.companies);
/** список компаний */
export const companiesListSeletor = createSelector(root, state => state.companies?.list);
/** количество компаний */
export const companiesTotalSeletor = createSelector(root, state => state.companies?.total);

/** информация о выбранной компании */
export const currentCompanySelector = createSelector(root, state => state.currentCompany);
/** имя */
export const nameCompanySelector = createSelector(root, state => state.currentCompany?.name);
/** Идентификатор ЭДО */
export const diServerIdCompanySelector = createSelector(
  root,
  state => state.currentCompany?.diServerId
);
/** inn */
export const innCompanySelector = createSelector(root, state => state.currentCompany?.inn);
/** kpp */
export const kppCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.kpp
);
/** ogrn */
export const ogrnCompanySelector = createSelector(root, state => state.currentCompany?.ogrn);
/** название налогового органа */
export const taxAuthorityTitleCompanySelector = createSelector(
  root,
  state => state.currentCompany?.taxAuthority?.title
);
/** код налогового органа */
export const taxAuthorityCodeCompanySelector = createSelector(
  root,
  state => state.currentCompany?.taxAuthority?.code
);
/** страна */
export const addressCountryTitleCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.country?.title
);
/** регион */
export const addressRegionTitleCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.region?.title
);
/** индекс */
export const addressPostalCodeCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.postalCode
);
export const addressDistrictCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.district
);
export const addressCityCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.addressCity
);
export const addressSettlementCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.settlement
);
export const addressStreetCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.street
);
export const addressHouseCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.house
);
export const addressBuildingCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.building
);
export const addressRoomCompanySelector = createSelector(
  root,
  state => state.currentCompany?.division?.address?.room
);
export const bankBikCompanySelector = createSelector(root, state => state.currentCompany?.bik);
export const bankTitleSelector = createSelector(root, state => state.currentCompany?.bankTitle);
export const accountNumberCompanySelector = createSelector(
  root,
  state => state.currentCompany?.accountNumber
);
export const tariffTitleSelector = createSelector(root, state => state.currentCompany?.tariffTitle);

/** сотрудники выбранной компании */
export const employeeSelector = createSelector(root, state => state.employee);
/** сертификат выбранного сотрудника */
export const certificatesSelector = createSelector(root, state => state.certificates);

/** список физ лиц */
export const personsListSeletor = createSelector(root, state => state.persons?.rows);
/** количество физ лиц */
export const personsTotalSeletor = createSelector(root, state => state.persons?.recordsTotal);

/** тарифы */
export const tariffsSeletor = createSelector(root, state => state.tariffs);
