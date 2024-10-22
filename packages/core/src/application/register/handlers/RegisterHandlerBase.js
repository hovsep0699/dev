import RegisterRequest from '../RegisterRequest';
import errorFactory from '../../error/ErrorFactory';
import DiError, { REGISTER } from '../../error/Error';

class RegisterHandlerBase {
  static checkRequest(request) {
    if (request === null || request === undefined) throw new Error('Следует передать запрос для регистрации(RegisterRequest)');
    if (!(request instanceof RegisterRequest)) throw new Error('Параметр должен быть подклассом RegisterRequest');
  }

  register(request) {
    RegisterHandlerBase.checkRequest(request);
    Object.freeze(request);
  }

  canHandle(request) {
    RegisterHandlerBase.checkRequest(request);
  }

  setNext(handler) {
    if (!(handler instanceof RegisterHandlerBase)) {
      throw new Error('Параметр должен быть подклассом RegisterHandlerBase');
    }
    this.next = handler;
    return this.next;
  }

  doNextHandler(request) {
    if (request.error) {
      if (!(request.error instanceof DiError)) {
        throw new Error('Неверный тип ошибки. Создавайте ошибки через createRegisterError');
      }
      return Promise.reject(request.error);
    }
    if (this.next) {
      return this.next.register(request);
    }
    return Promise.resolve({ success: true, isNaturalCreated: request.isNaturalCreated });
  }

  createRegisterError(msgForDeveloper, jsError, serverErrorResponse) {
    return errorFactory(REGISTER, msgForDeveloper, jsError, serverErrorResponse);
  }
}

export default RegisterHandlerBase;
