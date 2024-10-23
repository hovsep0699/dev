import SignRequest from '../SignRequest';
import SignService from '../SignService';
import errorFactory from '../../error/ErrorFactory';
import DiError, { SIGN } from '../../error/Error';

class SignHandlerBase {
  static checkRequest(request) {
    if (request === null || request === undefined)
      throw new Error('Следует передать запрос для подписи(SignRequest)');
    if (!(request instanceof SignRequest))
      throw new Error('Параметр должен быть подклассом SignRequest');
  }

  sign(request) {
    SignHandlerBase.checkRequest(request);
    Object.freeze(request);
  }

  canHandle(request) {
    SignHandlerBase.checkRequest(request);
  }

  setNext(handler) {
    if (!(handler instanceof SignHandlerBase)) {
      throw new Error('Параметр должен быть подклассом SignHandlerBase');
    }
    this.next = handler;
    return this.next;
  }

  doNextHandler(request) {
    if (request.error) {
      if (!(request.error instanceof DiError)) {
        throw new Error('Неверный тип ошибки. Создавайте ошибки через createSignError');
      }
      return Promise.reject(request.error);
    }
    if (SignService.isAborted) {
      SignService.resetIsAbortedFlag();
      return Promise.resolve({ success: true, data: request, isAborted: true });
    }
    if (this.next) {
      return this.next.sign(request);
    }
    return Promise.resolve({ success: true, data: request });
  }

  createSignError(msgForDeveloper, jsError, serverErrorResponse) {
    return errorFactory(SIGN, msgForDeveloper, jsError, serverErrorResponse);
  }
}

export default SignHandlerBase;
