import RegisterHandlerBase from './RegisterHandlerBase';
import RegisterRequest from '../RegisterRequest';
import UserAgreement from '../../../domain/register/UserAgreement';

class UserInputHandler extends RegisterHandlerBase {
  register(request) {
    super.register(request);
    if (this.canHandle(request)) {
      const agree = () => this.doNextHandler(request);

      const disagree = () => {
        const errorRequest = RegisterRequest.clone(request);
        errorRequest.error = super.createRegisterError('Пользователь инициировал вызов метода disagree.', new Error('Пользователь отказался'));
        return this.doNextHandler(errorRequest);
      };

      return new UserAgreement(request.parameters, agree, disagree);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !!(request.parameters && request.parameters.agreement_url);
  }
}

export default UserInputHandler;
