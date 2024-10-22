class RecoverRequest {
  constructor(parameters) {
    if (!parameters) return;
    if (parameters.email) this.email = parameters.email;
    if (parameters.captcha) this.captcha = parameters.captcha;
  }

  static clone(request) {
    if (request === null || request === undefined) throw new Error('Следует передать запрос для восстановления пароля(RecoverRequest)');
    if (!(request instanceof RecoverRequest)) throw new Error('Параметр должен быть подклассом RecoverRequest');
    const newReq = new RecoverRequest();
    newReq.email = request.email;
    newReq.captcha = request.captcha;
    newReq.error = request.error;
    return newReq;
  }

  set email(value) {
    this._email = value;
  }

  get email() {
    return this._email;
  }

  set captcha(value) {
    this._captcha = value;
  }

  get captcha() {
    return this._captcha;
  }

  set error(value) {
    this._error = value;
  }

  get error() {
    return this._error;
  }
}

export default RecoverRequest;
