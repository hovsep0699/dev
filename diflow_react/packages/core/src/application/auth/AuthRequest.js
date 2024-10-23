class AuthRequest {
  constructor(parameters) {
    if (!parameters) return;
    if (parameters.certificate) this.certificate = parameters.certificate;
    if (parameters.email) this.email = parameters.email;
    if (parameters.password) this.password = parameters.password;
    if (parameters.rawUser) this.rawUser = parameters.rawUser;
    if (parameters.rawCompany) this.rawCompany = parameters.rawCompany;
    if (parameters.employee) this.employee = parameters.employee;
    if (parameters.isAuthed) this.isAuthed = parameters.isAuthed;
    if (parameters.company) this.company = parameters.company;
    if (parameters.user) this.user = parameters.user;
  }

  static clone(request) {
    if (request === null || request === undefined)
      throw new Error('Следует передать запрос для авторизации(AuthRequest)');
    if (!(request instanceof AuthRequest))
      throw new Error('Параметр должен быть подклассом AuthRequest');
    const newReq = new AuthRequest();
    if (request.certificate) {
      newReq.certificate = request.certificate.clone();
    }
    newReq.loginString = request.loginString;
    newReq.loginStringSignedData = request.loginStringSignedData;
    newReq.email = request.email;
    newReq.password = request.password;
    newReq.error = request.error;
    newReq.employee = request.employee;
    newReq.rawUser = request.rawUser;
    newReq.rawCompany = request.rawCompany;
    newReq.isAuthed = request.isAuthed;
    newReq.company = request.company;
    newReq.user = request.user;

    return newReq;
  }

  set certificate(value) {
    this._certificate = value;
  }

  get certificate() {
    return this._certificate;
  }

  set email(value) {
    this._email = value;
  }

  get email() {
    return this._email;
  }

  set password(value) {
    this._password = value;
  }

  get password() {
    return this._password;
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

  set rawUser(value) {
    this._rawUser = value;
  }

  get rawUser() {
    return this._rawUser;
  }

  set rawCompany(value) {
    this._rawCompany = value;
  }

  get rawCompany() {
    return this._rawCompany;
  }

  set company(value) {
    this._company = value;
  }

  get company() {
    return this._company;
  }

  set user(value) {
    this._user = value;
  }

  get user() {
    return this._user;
  }

  set isAuthed(value) {
    this._isAuthed = value;
  }

  get isAuthed() {
    return this._isAuthed;
  }

  set error(value) {
    this._error = value;
  }

  get error() {
    return this._error;
  }
}

export default AuthRequest;
