import RecoverPasswordHandlerBase from '../RecoverPasswordHandlerBase';
import RecoverRequest from '../../RecoverRequest';
import Environment from '../../../Environment';

class AjaxRemindPasswordHandler extends RecoverPasswordHandlerBase {
  recover(request) {
    super.recover(request);
    if (this.canHandle(request)) {
      const url = '/front/employee/password/remind';
      const formData = new FormData();
      formData.append('email', request.email);
      formData.append('captcha', request.captcha);

      const successHandler = ({ data: { success, messages } }) => {
        if (success) {
          return this.doNextHandler(request);
        }
        const errResReq = RecoverRequest.clone(request);
        errResReq.error = super.createRecoverError(`Запрос ${url}`, null, messages);
        return this.doNextHandler(errResReq);
      };

      const failHandler = (error) => {
        const errorRequest = RecoverRequest.clone(request);
        errorRequest.error = super.createRecoverError(`Запрос ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return Environment.getAuthGateway().remind(url, formData).then(successHandler).catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return true;
  }
}

export default AjaxRemindPasswordHandler;
