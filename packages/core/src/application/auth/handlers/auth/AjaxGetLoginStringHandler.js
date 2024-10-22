import AuthHandlerBase from '../AuthHandlerBase';
import AuthRequest from '../../AuthRequest';
import Environment from '../../../Environment';

class AjaxGetLoginStringHandler extends AuthHandlerBase {
  auth(request) {
    super.auth(request);
    if (this.canHandle(request)) {
      const url = '/loginString';
      const successHandler = (response) => {
        const loginStringRequest = AuthRequest.clone(request);
        loginStringRequest.loginString = response.login_string;
        return this.doNextHandler(loginStringRequest);
      };

      const failHandler = (error) => {
        const errorRequest = AuthRequest.clone(request);
        errorRequest.error = super.createAuthError(`Запрос ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return Environment.getAuthGateway().loginString()
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !!request.certificate;
  }
}

export default AjaxGetLoginStringHandler;
