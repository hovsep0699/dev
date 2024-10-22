import RegisterHandlerBase from './RegisterHandlerBase';
import AJAX from '../../../infrastructure/AJAX';
import RegisterRequest from '../RegisterRequest';

class AjaxRegisterHandler extends RegisterHandlerBase {
  constructor(successCallback) {
    super();
    this._successCallback = successCallback;
  }

  register(request) {
    super.register(request);
    if (this.canHandle(request)) {
      const url = '/front/employee/registration';
      const formData = new FormData();
      formData.append('company', request.ogrn);
      formData.append('email', request.email);
      formData.append('person[surname]', request.surname);
      if (request.name) {
        formData.append('person[name]', request.name);
      }
      if (request.patronymic) {
        formData.append('person[patronymic]', request.patronymic);
      }
      formData.append('position', request.position);
      formData.append('password', request.password);
      formData.append('captcha', request.captcha);

      const successHandler = (res) => {
        if (res.data.success) {
          this._successCallback();
          return this.doNextHandler(request);
        }
        const errorResultRequest = RegisterRequest.clone(request);
        errorResultRequest.error = super.createRegisterError(`Запрос ${url}`, null, res.messages);
        return this.doNextHandler(errorResultRequest);
      };

      const failHandler = (error) => {
        const errorRequest = RegisterRequest.clone(request);
        errorRequest.error = super.createRegisterError(`Запрос ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return AJAX.postFormData(url, formData).then(successHandler).catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return request.ogrn
     && request.email
     && request.surname
     && request.name
     && request.position
     && request.password
     && request.captcha;
  }
}

export default AjaxRegisterHandler;
