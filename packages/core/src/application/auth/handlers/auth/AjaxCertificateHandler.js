import AuthHandlerBase from '../AuthHandlerBase';
import AuthRequest from '../../AuthRequest';
import Environment from '../../../Environment';

class AjaxCertificateHandler extends AuthHandlerBase {
  constructor(successCallback) {
    super();
    this._successCallback = successCallback;
  }

  auth(request) {
    super.auth(request);
    if (this.canHandle(request)) {
      const url = '/user/authenticate_via_certificate';
      const formData = new FormData();
      formData.append('signature', request.loginStringSignedData);

      const successHandler = res => {
        if (res.data && res.data.success) {
          this._successCallback();
          return this.doNextHandler(request);
        }
        const errResReq = AuthRequest.clone(request);
        errResReq.error = super.createAuthError(
          `Запрос ${url}`,
          new Error('Ответ получен. Но success false'),
          res.data.messages
        );
        return this.doNextHandler(errResReq);
      };

      const failHandler = error => {
        const errorRequest = AuthRequest.clone(request);
        errorRequest.error = super.createAuthError(`Запрос ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return Environment.getAuthGateway()
        .authViaCert(url, formData)
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return request.loginStringSignedData;
  }
}

export default AjaxCertificateHandler;
