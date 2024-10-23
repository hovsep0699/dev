import SignHandlerBase from '../SignHandlerBase';
import SignRequest from '../../SignRequest';
import Core from '../../../Core';
import SecurityService from '../../../security/SecurityService';

class RolesHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    if (this.canHandle(request)) {
      let isGrantedToSign = SecurityService.hasSignRole();
      if (isGrantedToSign) {
        isGrantedToSign = (Core.company && Core.company.isComplete) || Core.user;
      }

      if (isGrantedToSign) {
        const signRequest = SignRequest.clone(request);
        signRequest.isGrantedToSign = isGrantedToSign;
        return this.doNextHandler(signRequest);
      } else {
        const errorRequest = SignRequest.clone(request);
        errorRequest.error = super.createSignError(`Нет прав для подписания`);
        return this.doNextHandler(errorRequest);
      }
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !!request.certificate;
  }
}

export default RolesHandler;
