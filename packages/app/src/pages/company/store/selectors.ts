import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.company;

export const selectName = createSelector(root, state => state.details?.name);
export const selectDiServerId = createSelector(root, state => state.details?.diServerId);
export const selectInn = createSelector(root, state => state.details?.inn);
export const selectKpp = createSelector(root, state => state.details?.division?.kpp);
export const selectOkpo = createSelector(
  root,
  state => state.details?.division?.classificationNumber
);
export const selectOgrn = createSelector(root, state => state.details?.ogrn);
export const selectOgrnip = createSelector(root, state => state.details?.ogrn);
export const selectTaxAuthority = createSelector(root, state => state.details?.taxAuthority);
export const selectBik = createSelector(root, state => state.details?.bik);
export const selectAccountNumber = createSelector(root, state => state.details?.accountNumber);
export const selectCompanyType = createSelector(root, state => state.details?.type?.systemName);

export const selectPostalCode = createSelector(
  root,
  state => state.details?.division?.address?.postalCode
);
export const selectRegionId = createSelector(
  root,
  state => state.details?.division?.address?.region?.id
);
export const selectRegionTitle = createSelector(
  root,
  state => state.details?.division?.address?.region?.title
);
export const selectDistrict = createSelector(
  root,
  state => state.details?.division?.address?.district
);

export const selectCity = createSelector(root, state => state.details?.division?.address?.city);
export const selectSettlement = createSelector(
  root,
  state => state.details?.division?.address?.settlement
);
export const selectStreet = createSelector(root, state => state.details?.division?.address?.street);
export const selectHouse = createSelector(root, state => state.details?.division?.address?.house);
export const selectBuilding = createSelector(
  root,
  state => state.details?.division?.address?.building
);
export const selectRoom = createSelector(root, state => state.details?.division?.address?.room);
export const selectCountryId = createSelector(
  root,
  state => state.details?.division?.address?.country?.id
);

/** Ошибки вализации Реквизитов компании */
export const selectKppError = createSelector(root, state => state.errors.details?.division?.kpp);
export const selectOkpoError = createSelector(
  root,
  state => state.errors.details?.division?.classificationNumber
);
/** Номер расчётного счёта */
export const selectAccountNumberError = createSelector(
  root,
  state => state.errors.details?.accountNumber
);
/** Код налогового органа */
export const selectTaxAuthorityError = createSelector(
  root,
  state => state.errors.details?.taxAuthority
);
export const selectBikError = createSelector(root, state => state.errors.details?.bik);

/** Ошибки валидации Юридический адрес */
export const selectPostalCodeErrors = createSelector(
  root,
  state => state.errors.address?.postalCode
);
export const selectDistrictErrors = createSelector(root, state => state.errors.address?.district);
export const selectCityErrors = createSelector(root, state => state.errors.address?.city);
export const selectSettlementErrors = createSelector(
  root,
  state => state.errors.address?.settlement
);
export const selectStreetErrors = createSelector(root, state => state.errors.address?.street);
export const selectHouseErrors = createSelector(root, state => state.errors.address?.house);
export const selectBuildingErrors = createSelector(root, state => state.errors.address?.building);
export const selectRoomErrors = createSelector(root, state => state.errors.address?.room);
export const selectRegionErrors = createSelector(root, state => state.errors.address?.region);

/** Ошибки валидации Коннектора */
export const selectConnectorLoginErrors = createSelector(
  root,
  state => state.errors.connector?.credentials?.login?.errors
);
export const selectConnectorPasswordErrors = createSelector(
  root,
  state => state.errors.connector?.credentials?.password?.errors
);

/** список коннекторов */
export const selectConnectors = createSelector(root, state => state.connectors);

/** статус коннектора */
export const selectConnectorStatus = createSelector(root, state => state.connector?.status);
/** логин коннектора */
export const selectConnectorLogin = createSelector(root, state => state.connector?.login);
/** BoxID коннектора */
export const selectConnectorBoxID = createSelector(root, state => state.connector?.boxId);
/** fnsUid коннектора */
export const selectConnectorFnsUid = createSelector(root, state => state.connector?.fnsUid);
/** kpp коннектора */
export const selectConnectorKpp = createSelector(root, state => state.connector?.kpp);
/** id коннектора */
export const selectConnectorId = createSelector(root, state => state.connector?.id);
/** errorMessage коннектора */
export const selectConnectorErrorMessage = createSelector(
  root,
  state => state.connector?.errorMessage
);
/** должность коннектора */
export const selectConnectorPosition = createSelector(root, state => state.connector?.position);

/** список сотрудников */
export const selectStaff = createSelector(root, state => state.staff?.rows);
/** кол-во сотрудников */
export const selectStaffNumber = createSelector(root, state => state.staff?.recordsTotal);

/** фильтр сотрудников */
export const selectStaffFilter = createSelector(root, state => state.staffFilter);

/** список сотрудников в заявках на активацию */
export const selectStaffWaiting = createSelector(root, state => state.staffWaiting?.rows);
/** кол-во сотрудников в заявках на активацию */
export const selectStaffNumberWaiting = createSelector(
  root,
  state => state.staffWaiting?.recordsTotal
);

/** список отключенных сотрудников  */
export const selectStaffDeactivated = createSelector(root, state => state.staffDeactivated?.rows);
/** кол-во отключенных сотрудников */
export const selectStaffNumberDeactivated = createSelector(
  root,
  state => state.staffDeactivated?.recordsTotal
);

/** имя сотрудника */
export const selectEmployeeName = createSelector(root, state => state.employee?.person?.name);
/** фамилия сотрудника */
export const selectEmployeeSurname = createSelector(root, state => state.employee?.person?.surname);
/** отчество сотрудника */
export const selectEmployeePatronymic = createSelector(
  root,
  state => state.employee?.person?.patronymic
);
/** должность сотрудника */
export const selectEmployeePosition = createSelector(root, state => state.employee?.position);
/** email сотрудника */
export const selectEmployeeEmail = createSelector(root, state => state.employee?.email);
/** дата регистрации сотрудника */
export const selectEmployeeCreatedAt = createSelector(root, state => state.employee?.createdAt);
/** статус сотрудника */
export const selectEmployeeStatus = createSelector(root, state => state.employee?.status?.title);
/** id сотрудника */
export const selectEmployeeId = createSelector(root, state => state.employee?.id);
/** признак ответственности клиента */
export const selectEmployeeResponsible = createSelector(root, state => state.employee?.responsible);
/** id подразделения сотрудника по умолчанию */
export const selectEmployeeDefaultDivisionId = createSelector(
  root,
  state => state.employee?.defaultDivisionId
);

/** роли сотрудника */
export const selectRolesRows = createSelector(root, state => state.employeeRoles?.rows);
/** количество ролей сотрудника */
export const selectRolesTotal = createSelector(root, state => state.employeeRoles?.recordsTotal);
/** роли, которые можно добавить сотруднику */
export const selectNoRolesRows = createSelector(root, state => state.employeeNoRoles?.rows);
/** количество ролей которое можно добвить сотруднику */
export const selectNoRolesTotal = createSelector(
  root,
  state => state.employeeNoRoles?.recordsTotal
);

/** сертификаты сотрудника */
export const selectEmployeeCertificateRows = createSelector(
  root,
  state => state.employeeCertificate?.rows
);
/** количество сертификатов сотрудника */
export const selectEmployeeCertificateTotal = createSelector(
  root,
  state => state.employeeCertificate?.recordsTotal
);

/** подразделения */
export const selectEmployeeDivisionsRows = createSelector(
  root,
  state => state.employeeDivisions?.rows
);
/** количество подразделений */
export const selectEmployeeDivisionsTotal = createSelector(
  root,
  state => state.employeeDivisions?.recordsTotal
);

/** группы контрагентов сотрудника */
export const selectEmployeeContractorGroupRows = createSelector(
  root,
  state => state.employeeContractorGroups?.rows
);
/** количество элементов группы контрагентов сотрудника */
export const selectEmployeeContractorGroupTotal = createSelector(
  root,
  state => state.employeeContractorGroups?.recordsTotal
);
/** группы контрагентов которые можно добавить сотруднику */
export const selectEmployeeNoContractorGroupRows = createSelector(
  root,
  state => state.employeeNoContractorGroups?.rows
);
/** количество элементов группы контрагентов которые можно добавить сотруднику */
export const selectEmployeeNoContractorGroupTotal = createSelector(
  root,
  state => state.employeeNoContractorGroups?.recordsTotal
);

/** роли сотрудников */
export const selectStaffRoleRows = createSelector(root, state => state.staffRoles?.rows);
/** количество ролей сотрудников */
export const selectStaffRoleRecordsTotal = createSelector(
  root,
  state => state.staffRoles?.recordsTotal
);

/** сотрудники роли */
export const selectStaffForRoleRows = createSelector(root, state => state.staffForRole?.rows);
/** количество сотрудников роли */
export const selectStaffForRoleRecordsTotal = createSelector(
  root,
  state => state.staffForRole?.recordsTotal
);

/** сотрудники, которых можно добавить к роли */
export const selectNoStaffForRoleRows = createSelector(root, state => state.noStaffForRole?.rows);
/** количество сотрудников, которых можно добавить к роли */
export const selectNoStaffForRoleRecordsTotal = createSelector(
  root,
  state => state.noStaffForRole?.recordsTotal
);

/** правила документооборота для сотрудника */
export const selectDocumentFlowRoles = createSelector(root, state => state.documentFlowRoles);

/** подразделения компании */
export const selectDivisionsRows = createSelector(root, state => state.divisions?.rows);
/** количество подразделений компании */
export const selectDivisionsRecordsTotal = createSelector(
  root,
  state => state.divisions?.recordsTotal
);

/** ошибки создания нового подразделения */
export const selectCreateDivisionError = createSelector(root, state => state.createDivisionError);

/** сотрудники подразделения */
export const selectDivisionStaff = createSelector(root, state => state.divisionEmployee?.rows);
/** кол-во сотрудников подразделения */
export const selectDivisionStaffTotal = createSelector(
  root,
  state => state.divisionEmployee?.recordsTotal
);
/** сотрудники не в подразделении */
export const selectNoDivisionStaff = createSelector(root, state => state.noDivisionEmployee?.rows);
/** кол-во сотрудников не в подразделении */
export const selectNoDivisionStaffTotal = createSelector(
  root,
  state => state.noDivisionEmployee?.recordsTotal
);
