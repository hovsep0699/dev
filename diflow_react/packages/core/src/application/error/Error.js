const _ts = Symbol('ts');
const _errorType = Symbol('errorType');
const _msgForUser = Symbol('msgForUser');
const _msgForDeveloper = Symbol('msgForDeveloper');
const _jsError = Symbol('jsError');
const _serverErrorResponse = Symbol('serverErrorResponse');

export const AUTH = 'DiErrorAuth';
export const REGISTER = 'DiErrorRegister';
export const CERT = 'DiErrorCert';
export const RECOVER = 'DiErrorRecover';
export const CHANGE_COMPANY = 'DiErrorChangeCompany';
export const CHANGE_SETTINGS = 'DiErrorChangeSettings';
export const SECURITY = 'DiErrorSecurity';
export const AUTOCOMPLETE = 'DiErrorAutocomplete';
export const DOCUMENT = 'DiErrorDocument';
export const SIGN = 'DiErrorSign';
export const SEND_CONTAINER = 'DiErrorSendContainer';

export default class {
  constructor(
    errorType,
    msgForUser,
    msgForDeveloper = null,
    jsError = null,
    serverErrorResponse = null
  ) {
    this[_ts] = new Date().getTime();
    this.errorType = errorType;
    this.msgForUser = msgForUser;
    this.msgForDeveloper = msgForDeveloper;
    this.jsError = jsError;
    this.serverErrorResponse = serverErrorResponse;
  }

  set errorType(value) {
    this[_errorType] = value;
  }

  get errorType() {
    return this[_errorType];
  }

  set msgForUser(value) {
    this[_msgForUser] = value;
  }

  get msgForUser() {
    return this[_msgForUser];
  }

  set msgForDeveloper(value) {
    this[_msgForDeveloper] = value;
  }

  get msgForDeveloper() {
    return this[_msgForDeveloper];
  }

  set serverErrorResponse(value) {
    this[_serverErrorResponse] = value;
  }

  get serverErrorResponse() {
    return this[_serverErrorResponse];
  }

  set jsError(value) {
    this[_jsError] = value;
  }

  get jsError() {
    return this[_jsError];
  }

  get ts() {
    return this[_ts];
  }
}
