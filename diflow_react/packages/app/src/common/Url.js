export const MAIN = '/';

export const AUTH = '/auth/';
export const AUTH_CERT = '/auth/loginCertificate';
export const AUTH_LOGIN = '/auth/loginUsername';
export const REG_CERT = '/auth/registerCertificate';
export const REG_LOGIN = '/auth/registerUsername';
export const REMIND_PASSWORD = '/auth/remindPassword';
export const SET_PASSWORD = '/auth/setPassword';
export const INSTRUCTION = '/instruction.html';
export const UPDATE_PNG = '/bundles/diflowcore/images/update.png';

export const DOCUMENT = '/documents';
export const DOCUMENT_INBOX = '/documents/inbox';
export const DOCUMENT_OUTBOX = '/documents/outbox';
export const DOCUMENT_DRAFT = '/documents/draft';
export const DOCUMENT_ARCHIVE = '/documents/archive';
export const DOCUMENT_FOLDER = '/documents/folder/:id';
export const DOCUMENT_VIEW = '/document/:id';

export const CONTRACTS = '/contracts';
export const CONTRACTS_NEW = '/contracts/new';
export const CONTRACTS_VIEW = '/contracts/:id';


export const SYSTEM = '/system';
/** Система / Лицензия */
export const SYSTEM_LICENSE = '/system/license';
/** Система / Юридические лица */
export const SYSTEM_COMPANIES = '/system/companies';
/** Система / Физические лица */
export const SYSTEM_PERSONS = '/system/persons';
export const SYSTEM_CONNECTERS = '/system/connecters';
/** Система / Отчет  */
export const SYSTEM_REPORT = '/system/report';

/** Кабинет */
export const CABINET = '/cabinet';
/** Кабинет - Пользователь */
export const CABINET_EMPLOYEE = '/cabinet/employee';
export const CABINET_PERSON = '/old-cabinet#person';
export const CABINET_PERSON_BANK = '/old-cabinet#bank';
/** Кабинет - Оповещение */
export const CABINET_NOTIFICATION = '/cabinet/notification';
/** Кабинет - Сертификат */
export const CABINET_CERTIFICATE = '/cabinet/certificate';
export const CABINET_PERSON_CERTIFICATE = '/old-cabinet#certificate';

/** Компания */
export const COMPANY = '/company';
/** Реквизиты компании */
export const COMPANY_DETAILS = '/company/company_details';
/** Юридический адрес */
export const COMPANY_ADDRESS = '/company/address';
/** Коннектор */
export const COMPANY_CONNECTORS = '/company/connectors';
export const COMPANY_CONNECTOR = '/company/connectors/:id';
/** Сотрудники */
export const COMPANY_STAFF = '/company/staff';
/** Заявки на активацию */
export const COMPANY_STAFF_WAITING = '/company/staff_waiting';
/** Деактивированные сотрудники */
export const COMPANY_STAFF_DEACTIVATED = '/company/staff_deactivated';
/** Роли сотрудников */
export const COMPANY_EMPLOYEES_ROLES = '/company/roles';
/** Подразделения */
export const COMPANY_DIVISIONS = '/company/divisions';

export const COMPANY_CONNECTER = '/_company/connecters/:id';
export const COMPANY_EMPLOYEE = '/company#employee';


/** контрагенты */
export const CONTRACTOR = '/contractor';
/** контрагенты - пригласить контрагента */
export const CONTRACTOR_INVITE = '/contractor/invite';
/** контрагенты - группы */
export const CONTRACTOR_GROUP ='/contractor/group';
/** Контрагенты - приглашают вас */
export const CONTRACTOR_INVITE_YOU = '/contractor/invite_you';
/** Контрагенты - ожидают ответа */
export const CONTRACTOR_WAITING_ANSWER = '/contractor/waiting_answer';
/** Контрагенты - ЮЛ */
export const CONTRACTOR_COMPANIES = '/contractor/companies';
/** Контрагенты - ФЛ */
export const CONTRACTOR_PERSONS = '/contractor/persons';

/** Тарифы */
export const TARIFF = '/tariff';

export  const  POA = "/POA"

export const NEW_ACT = '/document/act/552/new';
export const EDIT_ACT = '/document/act/552/:id';
export const NEW_WAYBILL = '/document/waybill/551/new';
export const EDIT_WAYBILL = '/document/waybill/551/:id';
export const NEW_UNFORMALIZED = '/document/unformalized/new';
export const EDIT_UNFORMALIZED = '/document/unformalized/:id';
export const NEW_BILL = '/document/bill/new';
export const EDIT_BILL = '/document/bill/:id';
export const NEW_UNIVERSAL_INVOICE = '/document/universal_invoice/new';
export const EDIT_UNIVERSAL_INVOICE = '/document/universal_invoice/:id';
export const NEW_UNIVERSAL_CORRECTION_DOCUMENT = '/document/universal_correction_document/new';
export const EDIT_UNIVERSAL_CORRECTION_DOCUMENT = '/document/universal_correction_document/:id';
export const NEW_INVOICE_UTD = '/document/invoice_utd/new';
export const EDIT_INVOICE_UTD = '/document/invoice_utd/:id';
export const NEW_INVOICE_CORRECTION_UCD = '/document/invoice_correction_ucd/new';
export const EDIT_INVOICE_CORRECTION_UCD = '/document/invoice_correction_ucd/:id';
export const EDIT_INVOICE = '/document/invoice_utd/:id';
export const NEW_INVOICE_CORRECTION = '/document/invoice/correction/new';
export const EDIT_INVOICE_CORRECTION = '/document/invoice/correction/:id';

/** Финансы */
export const FINANCE = '/finance'
/** Финансы - Информация */
export const FINANCE_INFORMATION = '/finance/information';
/** Финансы - История транзакций */
export const FINANCE_TRANSACTION_HISTORY = '/finance/transaction_history';
/** Финансы - История тарифов */
export const FINANCE_TARIFF_HISTORY = '/finance/tariff_history';

/** создать документ из файла */
export const CREATE_FROM_FILE = '/create_from_file';
