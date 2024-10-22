/** Контрагент ФЛ */
export interface NaturalEntityContractorItem {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  /** СНИЛС */
  socialNumber: string;
  status: RelationStatus;
  contractorId: number;
}

/** Контрагент ФЛ */
export interface NaturalEntityContractor {
  rows?: NaturalEntityContractorItem[];
  recordsTotal?: number;
}

/** Контрагент ЮЛ */
export interface LegalEntityContractorItem {
  id: number;
  /** Наименование */
  name: string;
  /** Идентификатор участника документообоорота ФНС */
  fnsUid: string;
  inn: string;
  isActive: boolean;
  /** Перечень статусов контрагентских взаимоотношений */
  status: RelationStatus;
  contractorId: number;
  /** Перечень внешних типов контрагента */
  externalType: DestinationType;
  externalOperator: string;
  network: string;
}
/** Контрагент ЮЛ */
export interface LegalEntityContractor {
  rows?: LegalEntityContractorItem[];
  recordsTotal?: number;
}

/** Входящее приглашение контрагента */
export interface IncomeContractorElement {
  id: number;
  title: string;
  inn: string;
  name: string;
  surname: string;
  patronymic: string;
  /** статус приглашения */
  status: IncomeContractorStatus;
  /** типов приглашения */
  type: DestinationType;
  /** тип контрагента */
  contractorType: ContractorTypes;
  errorMessage: string;
  /** Наименование сети */
  network: string;
  /** Идентификатор ФНС */
  fnsUid: string;
  /** Дата и время создания */
  createdAt: string;
}

/** Входящее приглашение контрагента */
export interface IncomeContractor {
  rows?: IncomeContractorElement[];
  recordsTotal?: number;
  searchParams?: any;
}

/** Перечень статусов приглашений */
export enum IncomeContractorStatus {
  created = 'created',
  error = 'error',
  processed = 'processed'
}

/* Типы контрагента */
export enum ContractorTypes {
  /** ЮЛ */
  legal_entity = 'legal_entity',
  /** ФЛ */
  natural_entity = 'natural_entity'
}

/* Типы направлений */
export enum DestinationType {
  /** локальный */
  Local = 'local',
  /** роуминг */
  Roaming = 'roaming',
  /** локальный роуминг */
  LoaclRoaming = 'internal_roaming',
  /** 1С-ЭДО */
  Hub1c = 'taxcom',
  /** Коннектор */
  Connector = 'connector'
}

/** Перечень статусов контрагентских взаимоотношений */
export enum RelationStatus {
  Active = 'active',
  Blocked = 'blocked'
}

/** результат поиска ФЛ*/
export interface PersonItem {
  id: string;
  name: string;
  patronymic: string;
  relationStatus: RelationStatus;
  socialNumber: string;
  surname: string;
}
export interface Person {
  rows: PersonItem[];
  recordsTotal: number;
  searchParams?: any;
}

/** результат поиска ЮЛ или ИП*/
export interface Company {
  id: string;
  inn: string;
  name: string;
  relationStatus: RelationStatus;
}

/** результат поиска контрагентов */
export interface Search {
  person?: Person & Pagination;
  localRoamingCompany?: LocalRoamingCompany;
  company?: LocalCompanySearchResponse & Pagination;
  errors?: any;
}

/** элемент списка групп контрагентов */
export interface GroupsItem {
  id: number;
  title: string;
}

/** параметры пагинации */
export interface Pagination {
  offset?: number;
  limit?: number;
}

export interface Groups {
  recordsTotal: number;
  rows: GroupsItem[];
}

/** информация о группе контрагентов ЮЛ и ИП - Элемент массива */
export interface LegalEntityGroupInfoItem {
  id: number;
  /** Наименования компании */
  name: string;
  /** Идентификатор участника документообоорота ФНС */
  fnsUid: string;
  inn: string;
  /** Признак активности */
  isActive: boolean;
  /** Тип компнаии */
  typeName: 'UL' | 'IP';
  /** Перечень статусов контрагентских взаимоотношений */
  status: RelationStatus;
  /** Идентификатор взаимоотношений */
  contractorId: number;
  /** Перечень внешних типов контрагента */
  externalType: DestinationType;
  /** Внешний оператор */
  externalOperator: string;
  /** Имя сети */
  network: string;
}

/** информация о группе контрагентов ЮЛ и ИП */
export interface LegalEntityGroupInfo {
  rows: LegalEntityGroupInfoItem[];
  recordsTotal: number;
}

/** информация о группе контрагентов ФЛ - Элемент массива */
export interface NaturalEntityGroupInfoItem {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  socialNumber: string;
  status: RelationStatus;
  contractorId: number;
}

/** информация о группе контрагентов ЮЛ и ИП */
export interface NaturalEntityGroupInfo {
  rows: NaturalEntityGroupInfoItem[];
  recordsTotal: number;
}

/** информация о группе контрагентов Сотрудники - Элемент массива */
export interface EmployeeGroupInfoItem {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  position: string;
  status: RelationStatus;
}

/** информация о группе контрагентов Сотрудники */
export interface EmployeeGroupInfo {
  rows: EmployeeGroupInfoItem[];
  recordsTotal: number;
}

/** Оператор */
export interface ExternalOperator {
  code: string;
  name: string;
}

export interface ExternalOperators {
  rows?: ExternalOperator[];
}

/** элемент группы карточки контрагента */
export interface ContractorGroup {
  id: number;
  title: string;
}
/** группа карточки контрагента */
export interface ContractorGroups {
  rows: ContractorGroup[];
  recordsTotal: number;
}

export interface CurrentContractorPerson {
  id: number;
  socialNumber: string;
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  active: boolean;
  natural: {};
}

/** Инфо для карточки ЮЛ */
export interface CurrentContractorCompany {
  name: string;
  /** Идентификатор ФНС */
  fnsUid: string;
  inn: string;
  kpp?: string;
  ogrn?: string;
  /** Код налоговой */
  taxAuthorityCode?: string;
  /** Наименование налоговой */
  taxAuthorityTitle?: string;
  /** Признак типизированного адреса */
  addressIsStrict?: boolean;
  /** Слаботипизированный адрес */
  addressLooselyTypedAddress?: string;
  /** Страна */
  addressCountryTitle?: string;
  /** Регион */
  addressRegionTitle?: string;
  /** Индекс */
  addressPostalCode?: string;
  /** Район */
  addressDistrict?: string;
  /** Город */
  addressCity?: string;
  /** Населенный пункт */
  addressSettlement?: string;
  /** Улица */
  addressStreet?: string;
  /** Дом */
  addressHouse?: string;
  /** Корпус */
  addressBuilding?: string;
  /** Номер квартиры/офиса */
  addressRoom?: string;
  /** БИК */
  bankBik?: string;
  /** Наименвоание банка */
  bankTitle?: string;
  /** Номер расчетного счета */
  accountNumber?: string;
  /** Перечень внешних типов контрагента */
  externalType?: DestinationType;
  /** Внешний оператор */
  externalOperator?: string;
  /** Сеть */
  network?: string;
}

/** дефолтный стейт контрагентов */
export interface DefaultState {
  error: boolean;
  isLoading: boolean;
  search: Search;
  inviteYou: IncomeContractor & Pagination;
  waitingAnswer: IncomeContractor & Pagination;
  legalEntity: LegalEntityContractor & Pagination;
  naturalEntity: NaturalEntityContractor & Pagination;
  operators: Operator[];
  filter: {};
  groups: Groups & Pagination;
  /** еще не добавленные */
  groupInfo: {
    legalEntityInfo?: LegalEntityGroupInfo & Pagination;
    naturalEntityInfo?: NaturalEntityGroupInfo & Pagination;
    employeeInfo?: EmployeeGroupInfo & Pagination;
  };
  /** кого уже добавили */
  groupInfoAdded: {
    legalEntityInfo?: LegalEntityGroupInfo & Pagination;
    naturalEntityInfo?: NaturalEntityGroupInfo & Pagination;
    employeeInfo?: EmployeeGroupInfo & Pagination;
  };
  externalOperators: ExternalOperators;
  currentContractor: {
    groups?: ContractorGroups;
    newGroups?: ContractorGroups;
    person?: CurrentContractorPerson;
    company?: CurrentContractorCompany;
  };
}

/** элемент результата поиска ЮЛ - Локально */
export interface LocalCompanySearchResponseElement {
  /** Идентификатор */
  id: string;
  /** Наименование */
  name: string;
  /** ИНН */
  inn: string;
  /** Перечень статусов контрагентских взаимоотношений */
  relationStatus: RelationStatus;
}

/** результат поиска ЮЛ - Локально */
export interface LocalCompanySearchResponse {
  rows: LocalCompanySearchResponseElement[];
  recordsTotal: number;
  searchParams?: any;
}

/** элемент результата поиска ЮЛ - Локальный Роуминг */
export interface LocalRoamingCompanyElement {
  /** Идентификатор участника документооборота ФНС */
  fnsUid: string;
  /** Наименование сети */
  network: string;
  /** Наименование */
  name: string;
  /** ИНН */
  inn: string;
  /** Перечень статусов контрагентских взаимоотношений */
  relationStatus: RelationStatus;
  networkName: string;
}

/** результат поиска ЮЛ - Локальный Роуминг */
export interface LocalRoamingCompany {
  rows: LocalRoamingCompanyElement[];
  recordsTotal: number;
  searchParams?: any;
}

/** Аргументы функции обработки сабмита формы */
export interface SubmitArgs {
  /** Типы контрагента */
  contractorType: ContractorTypes;
  /** Типы направлений */
  destinationType: DestinationType;
  /** ИНН */
  inn?: string;
  /** Название */
  title?: string;
  /** Идентификатор клиента */
  fnsUid?: string;
  /** Имя */
  name?: string;
  /** Фамилия */
  surname?: string;
  /** Отчество */
  patronymic?: string;
  /** СНИЛС */
  socialNumber?: string;
}

/** Аргументы диспатча отправки приглашения */
export interface InvitationArgs {
  /** Типы направлений */
  destinationType: DestinationType;
  /** ИНН */
  inn?: string;
  /** Название */
  title?: string;
  /** Идентификатор клиента */
  fnsUid?: string;
  /** Имя */
  name?: string;
  /** Фамилия */
  surname?: string;
  /** Отчество */
  patronymic?: string;
  /** СНИЛС */
  socialNumber?: string;
}

/** Приглашение */
interface Invitation {
  id: string;
  title: string;
  inn: string;
  status: string;
  type: string;
}

/** аргументы запроса списка ЮЛ */
export interface getLegalEntityContractorsPayload {
  limit?: number;
  offset?: number;
  name?: string;
  inn?: string;
  externalOperator?: string;
  externalType?: DestinationType[];
  status?: RelationStatus;
}

/** аргументы запроса списка ФЛ */
export interface getNaturalEntityContractorsPayload {
  limit?: number;
  offset?: number;
  name?: string;
  patronymic?: string;
  surname?: string;
  socialNumber?: string;
}

enum OperatorStatuses {
  created = 'created',
  import = 'import',
  connector = 'connector',
  stopped = 'stopped'
}

export interface Operator {
  id: number;
  operator: {
    code: string;
    name: string;
    inn: string;
  };
  status: OperatorStatuses;
}

/** Варианты принятия решения */
export enum InvitationDecision {
  accept = 'accept',
  reject = 'reject'
}
