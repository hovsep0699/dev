import HasAuthHandlerBase from '../HasAuthHandlerBase';
import AuthRequest from '../../AuthRequest';
import Environment from '../../../Environment';

class AjaxGetUserInfoHandler extends HasAuthHandlerBase {
  hasAuth(request) {
    const url = '/front/user/current';
    const successHandler = res => {
      if (typeof res === 'string' || !res) {
        // Это редирект 302. Значит пользователь не залогинен
        const notAuthedRequest = new AuthRequest();
        notAuthedRequest.isAuthed = false;
        return this.doNextHandler(notAuthedRequest);
      }
      const userReadyRequest = request ? AuthRequest.clone(request) : new AuthRequest();
      userReadyRequest.rawUser = res;
      userReadyRequest.isAuthed = true;
      return this.doNextHandler(userReadyRequest);
    };

    const failHandler = error => {
      const errorRequest = new AuthRequest();
      errorRequest.error = super.createAuthError(`Запрос ${url}`, error);
      return this.doNextHandler(errorRequest);
    };

    return Environment.getAuthGateway()
      .currentUser()
      .then(successHandler)
      .catch(failHandler);
  }
}

export default AjaxGetUserInfoHandler;
