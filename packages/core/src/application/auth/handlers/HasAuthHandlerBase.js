import errorFactory from '../../error/ErrorFactory';
import DiError, { AUTH } from '../../error/Error';
import AuthRequest from '../AuthRequest';

class HasAuthHandlerBase {
  static checkRequest(request) {
    if (request && !(request instanceof AuthRequest)) {
      throw new Error('Параметр должен быть подклассом AuthRequest');
    }
  }

  async hasAuth() {
    throw new Error('Метод hasAuth должен быть переопределён в подклассе');
  }

  canHandle(request) {
    HasAuthHandlerBase.checkRequest(request);
  }

  setNext(handler) {
    if (!(handler instanceof HasAuthHandlerBase)) {
      throw new Error('Параметр должен быть подклассом HasAuthHandlerBase');
    }
    this.next = handler;
    return this.next;
  }

  doNextHandler(request) {
    if (request.error) {
      if (!(request.error instanceof DiError)) {
        throw new Error('Неверный тип ошибки. Создавайте ошибки через createAuthError');
      }
      return Promise.resolve({ isAuthed: false });
    }
    if (this.next) {
      return this.next.hasAuth(request);
    }

    return Promise.resolve({
      isAuthed: request.isAuthed,
      user: request.user,
      company: request.company,
      certificate: request.certificate
    });
  }

  createAuthError(msgForDeveloper, jsError, serverErrorResponse) {
    return errorFactory(AUTH, msgForDeveloper, jsError, serverErrorResponse);
  }
}

export default HasAuthHandlerBase;
