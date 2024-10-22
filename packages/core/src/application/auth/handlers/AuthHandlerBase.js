import AuthRequest from '../AuthRequest';
import errorFactory from '../../error/ErrorFactory';
import DiError, { AUTH } from '../../error/Error';

class AuthHandlerBase {
  static checkRequest(request) {
    if (request === null || request === undefined) throw new Error('Следует передать запрос для авторизации(AuthRequest)');
    if (!(request instanceof AuthRequest)) throw new Error('Параметр должен быть подклассом AuthRequest');
    if (!(!!request.certificate || !!request.email || !!request.password)) throw new Error('Запрос пустой');
  }

  auth(request) {
    AuthHandlerBase.checkRequest(request);
    Object.freeze(request);
  }

  canHandle(request) {
    AuthHandlerBase.checkRequest(request);
  }

  setNext(handler) {
    if (!(handler instanceof AuthHandlerBase)) {
      throw new Error('Параметр должен быть подклассом AuthHandlerBase');
    }
    this.next = handler;
    return this.next;
  }

  doNextHandler(request) {
    if (request.error) {
      if (!(request.error instanceof DiError)) {
        throw new Error('Неверный тип ошибки. Создавайте ошибки через createAuthError');
      }
      return Promise.reject(request.error);
    }
    if (this.next) {
      return this.next.auth(request);
    }
    return Promise.resolve({ success: true });
  }

  createAuthError(msgForDeveloper, jsError, serverErrorResponse) {
    return errorFactory(AUTH, msgForDeveloper, jsError, serverErrorResponse);
  }
}

export default AuthHandlerBase;
