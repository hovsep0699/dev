import AuthHandlerBase from '../AuthHandlerBase';
import AuthRequest from '../../AuthRequest';
import Environment from '../../../Environment';

class AjaxEmailPasswordHandler extends AuthHandlerBase {
  constructor(successCallback) {
    super();
    this._successCallback = successCallback;
  }

  auth(request) {
    super.auth(request);
    if (this.canHandle(request)) {
      const url = '/front/login';
      const formData = new FormData();
      formData.append('email', request.email);
      formData.append('password', request.password);

      const successHandler = res => {
        if (res.data && res.data.success) {
          this._successCallback();
          return this.doNextHandler(request);
        }
        const errResReq = AuthRequest.clone(request);
        errResReq.error = super.createAuthError(`Запрос ${url}`, null, res.data.messages);
        return this.doNextHandler(errResReq);
      };

      const failHandler = error => {
        const errorRequest = AuthRequest.clone(request);
        errorRequest.error = super.createAuthError(`Запрос ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return Environment.getAuthGateway()
        .login(url, formData)
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    if (request.email && request.certificate)
      throw new Error('В запросе должен быть либо certificate, либо email/password');
    if (request.email && !request.password)
      throw new Error('В запрос необходимо передать password');
    return request.email && request.password;
  }
}

export default AjaxEmailPasswordHandler;
