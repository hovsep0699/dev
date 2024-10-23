import RecoverRequest from '../RecoverRequest';
import errorFactory from '../../error/ErrorFactory';
import DiError, { RECOVER } from '../../error/Error';

class RecoverPasswordHandlerBase {
  static checkRequest(request) {
    if (request === null || request === undefined) throw new Error('Следует передать запрос для восстановления пароля(RecoverRequest)');
    if (!(request instanceof RecoverRequest)) throw new Error('Параметр должен быть подклассом RecoverRequest');
    if (!(!!request.email || !!request.captcha)) throw new Error('Запрос пустой');
  }

  recover(request) {
    RecoverPasswordHandlerBase.checkRequest(request);
    Object.freeze(request);
  }

  canHandle(request) {
    RecoverPasswordHandlerBase.checkRequest(request);
  }

  setNext(handler) {
    if (!(handler instanceof RecoverPasswordHandlerBase)) {
      throw new Error('Параметр должен быть подклассом RecoverPasswordHandlerBase');
    }
    this.next = handler;
    return this.next;
  }

  doNextHandler(request) {
    if (request.error) {
      if (!(request.error instanceof DiError)) {
        throw new Error('Неверный тип ошибки. Создавайте ошибки через createRecoverError');
      }
      return Promise.reject(request.error);
    }
    if (this.next) {
      return this.next.recover(request);
    }
    return Promise.resolve({ success: true });
  }

  createRecoverError(msgForDeveloper, jsError, serverErrorResponse) {
    return errorFactory(RECOVER, msgForDeveloper, jsError, serverErrorResponse);
  }
}

export default RecoverPasswordHandlerBase;
