import RegisterHandlerBase from './RegisterHandlerBase';
import AJAX from '../../../infrastructure/AJAX';
import RegisterRequest from '../RegisterRequest';

class AjaxGetLoginStringHandler extends RegisterHandlerBase {
  register(request) {
    super.register(request);
    if (this.canHandle(request)) {
      const url = '/loginString';

      const successHandler = (response) => {
        const loginStringRequest = RegisterRequest.clone(request);
        loginStringRequest.loginString = response.login_string;
        return this.doNextHandler(loginStringRequest);
      };

      const errorHandler = (error) => {
        const errorRequest = RegisterRequest.clone(request);
        errorRequest.error = super.createRegisterError(`Запрос GET ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return AJAX.doGet(url).then(successHandler).catch(errorHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !!request.certificate;
  }
}

export default AjaxGetLoginStringHandler;
