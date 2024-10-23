import DomainCertificate from '../../domain/common/Certificate';

class RegisterRequest {
  constructor(parameters) {
    if (!parameters) return;
    if (parameters.certificate) this.certificate = parameters.certificate;
    if (parameters.ogrn) this.ogrn = parameters.ogrn;
    if (parameters.email) this.email = parameters.email;
    if (parameters.surname) this.surname = parameters.surname;
    if (parameters.name) this.name = parameters.name;
    if (parameters.patronymic) this.patronymic = parameters.patronymic;
    if (parameters.position) this.position = parameters.position;
    if (parameters.password) this.password = parameters.password;
    if (parameters.captcha) this.captcha = parameters.captcha;
    if (parameters.isNaturalCreated) this.isNaturalCreated = parameters.isNaturalCreated;
    if (parameters.isCompanyCreated) this.isCompanyCreated = parameters.isCompanyCreated;
  }

  static clone(request) {
    if (request === null || request === undefined) throw new Error('Следует передать запрос для авторизации(RegisterRequest)');
    if (!(request instanceof RegisterRequest)) throw new Error('Параметр должен быть подклассом RegisterRequest');
    const newReq = new RegisterRequest();
    newReq.ogrn = request.ogrn;
    newReq.email = request.email;
    newReq.surname = request.surname;
    newReq.name = request.name;
    newReq.patronymic = request.patronymic;
    newReq.position = request.position;
    newReq.password = request.password;
    newReq.captcha = request.captcha;
    newReq.parameters = request.parameters;
    if (request.certificate) {
      newReq.certificate = request.certificate.clone();
    }
    newReq.loginString = request.loginString;
    newReq.loginStringSignedData = request.loginStringSignedData;
    newReq.error = request.error;
    newReq.isCompanyCreated = request.isCompanyCreated;
    newReq.isNaturalCreated = request.isNaturalCreated;
    return newReq;
  }

  set ogrn(value) {
    this._ogrn = value;
  }

  get ogrn() {
    return this._ogrn;
  }

  set email(value) {
    this._email = value;
  }

  get email() {
    return this._email;
  }

  set surname(value) {
    this._surname = value;
  }

  get surname() {
    return this._surname;
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  set patronymic(value) {
    this._patronymic = value;
  }

  get patronymic() {
    return this._patronymic;
  }

  set position(value) {
    this._position = value;
  }

  get position() {
    return this._position;
  }

  set password(value) {
    this._password = value;
  }

  get password() {
    return this._password;
  }

  set captcha(value) {
    this._captcha = value;
  }

  get captcha() {
    return this._captcha;
  }

  set certificate(value) {
    if (!(value instanceof DomainCertificate)) {
      throw new Error('Неверный тип certificate. Должен быть DomainCertificate');
    }
    this._certificate = value;
  }

  get certificate() {
    return this._certificate;
  }

  set loginString(value) {
    this._loginString = value;
  }

  get loginString() {
    return this._loginString;
  }

  set loginStringSignedData(value) {
    this._loginStringSignedData = value;
  }

  get loginStringSignedData() {
    return this._loginStringSignedData;
  }

  set parameters(value) {
    this._parameters = value;
  }

  get parameters() {
    return this._parameters;
  }

  set error(value) {
    this._error = value;
  }

  get error() {
    return this._error;
  }

  set isCompanyCreated(value) {
    this._isCompanyCreated = value;
  }

  get isCompanyCreated() {
    return this._isCompanyCreated;
  }

  set isNaturalCreated(value) {
    this._isNaturalCreated = value;
  }

  get isNaturalCreated() {
    return this._isNaturalCreated;
  }
}

export default RegisterRequest;
