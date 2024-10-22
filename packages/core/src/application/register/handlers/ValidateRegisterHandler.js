import RegisterHandlerBase from './RegisterHandlerBase';
import RegisterRequest from '../RegisterRequest';

class ValidateRegisterHandler extends RegisterHandlerBase {
  register(request) {
    super.register(request);
    if (this.canHandle(request)) {
      const requiredFields = ['ogrn', 'email', 'position', 'surname', 'name', 'password', 'captcha'];

      const isInvalid = requiredFields.some(field => !request[field]);
      if (isInvalid) {
        const errorRequest = RegisterRequest.clone(request);
        const error = new Error('Нельзя отправлять запрос на регистрацию, т.к. нет необходимых полей');
        const msgForDeveloper = 'Валидация на стороне клиента прошла(хотя не должна была).';
        errorRequest.error = super.createRegisterError(msgForDeveloper, error);
        return this.doNextHandler(errorRequest);
      }
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !request.certificate;
  }
}

export default ValidateRegisterHandler;
