/** отправить файл */
export const SEND_FILE = '[DOCUMENT FROM FILE] SEND FILE';

/** установить тип документооборота */
export const SET_FLOW_TYPE = '[DOCUMENT FROM FILE] SET FLOW TYPE';

/** создать документ из файла */
export const CREATE_DOCUMENT_FROM_FILE = '[DOCUMENT FROM FILE] CREATE';

/** получить справочники для создания неформализованного документа */
export const GET_UNFORMALIZED_DICTONARIES = '[UNFORMALIZED] GET DICTONARIES';
/** сохранить подразделения отправителя */
export const SET_UNFORMALIZED_DIVISION_EMPLOYEE = '[UNFORMALIZED] SET DIVISION EMPLOYEE';
/** сохранить вид документа */
export const SET_UNFORMALIZED_FLOW = '[UNFORMALIZED] SET FLOW';

/** получить информацию о документе */
export const GET_DOCUMENT_JSON = '[UNFORMALIZED] GET DOCUMENT JSON';
/** установить информацию о документе */
export const SET_DOCUMENT_JSON = '[UNFORMALIZED] SET DOCUMENT JSON';

/** создать неформализованный документ */
export const CREATE_UNFORMALIZED = '[UNFORMALIZED] CREATE';
/** установить ошибки неформализованного документа */
export const SET_UNFORMALIZED_ERROR = '[UNFORMALIZED] SET ERROR';
/** редактировать неформализованный документ */
export const EDIT_UNFORMALIZED = '[UNFORMALIZED] EDIT';
