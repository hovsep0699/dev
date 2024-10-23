import HasAuthHandlerBase from '../HasAuthHandlerBase';
import AuthRequest from '../../AuthRequest';
import Environment from '../../../Environment';

class AjaxGetCompanyInfoHandler extends HasAuthHandlerBase {
  hasAuth(request) {
    if (this.canHandle(request)) {
      const url = '/front/company/current';
      const successHandler = res => {
        const userReadyRequest = AuthRequest.clone(request);
        userReadyRequest.rawCompany = res;
        return this.doNextHandler(userReadyRequest);
      };

      const failHandler = error => {
        const errorRequest = new AuthRequest();
        errorRequest.error = super.createAuthError(`Запрос ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return Environment.getAuthGateway()
        .currentCompany()
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    const user = request.rawUser;
    const isCompany = user && user.company;
    if (!isCompany) return false;

    if (request.isAuthed === false || !user) {
      return false;
    }
    return true;
  }
}

export default AjaxGetCompanyInfoHandler;
