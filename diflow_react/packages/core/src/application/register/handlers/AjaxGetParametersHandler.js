import RegisterHandlerBase from './RegisterHandlerBase';
import AJAX from '../../../infrastructure/AJAX';
import RegisterRequest from '../RegisterRequest';

class AjaxGetParametersHandler extends RegisterHandlerBase {
  register(request) {
    super.register(request);
    if (this.canHandle(request)) {
      const url = '/parameters';

      const successHandler = (res) => {
        const resultRequest = RegisterRequest.clone(request);
        resultRequest.parameters = res;
        return this.doNextHandler(resultRequest);
      };

      const failHandler = (error) => {
        const errorRequest = RegisterRequest.clone(request);
        errorRequest.error = super.createRegisterError(`Запрос GET ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return AJAX.doGet(url).then(successHandler).catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !!request.certificate;
  }
}

export default AjaxGetParametersHandler;
