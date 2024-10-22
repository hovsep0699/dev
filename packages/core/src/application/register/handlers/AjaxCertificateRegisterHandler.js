import RegisterHandlerBase from './RegisterHandlerBase';
import AJAX from '../../../infrastructure/AJAX';
import RegisterRequest from '../RegisterRequest';

class AjaxCertificateRegisterHandler extends RegisterHandlerBase {
  constructor(successCallback) {
    super();
    this._successCallback = successCallback;
  }

  register(request) {
    super.register(request);
    if (this.canHandle(request)) {
      const url = '/front/user/register_via_certificate';
      const formData = new FormData();
      formData.append('signature', request.loginStringSignedData);
      formData.append('content', request.loginString);

      const successHandler = (res) => {
        if (res.data && res.data.success) {
          this._successCallback();
          const resultRequest = RegisterRequest.clone(request);
          resultRequest.isNaturalCreated = res.data.isNaturalCreated;
          resultRequest.isCompanyCreated = res.data.isCompanyCreated;
          return this.doNextHandler(resultRequest);
        }
        const errorResultRequest = RegisterRequest.clone(request);
        errorResultRequest.error = super.createRegisterError(`Запрос ${url}`, new Error('Ошибка регистрации'), res.messages);
        return this.doNextHandler(errorResultRequest);
      };

      const failHandler = (error) => {
        var responseData = null
        if(error.response && error.response.data.messages){
          responseData = error.response.data.messages
        }
        const errorRequest = RegisterRequest.clone(request);

        errorRequest.error = super.createRegisterError(`Запрос ${url}`, error, responseData);
        return this.doNextHandler(errorRequest);
      };

      return AJAX.postFormData(url, formData).then(successHandler).catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return request.loginStringSignedData;
  }
}

export default AjaxCertificateRegisterHandler;
