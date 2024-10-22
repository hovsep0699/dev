import SignHandlerBase from '../SignHandlerBase';
import SignRequest from '../../SignRequest';
import Environment from '../../../Environment';

class ReceiptsHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    if (this.canHandle(request)) {
      const url = '/front/document/for_signing';
      const successHandler = response => {
        const grantedRequest = SignRequest.clone(request);
        grantedRequest.documents = response.documents;
        return this.doNextHandler(grantedRequest);
      };

      const failHandler = error => {
        const errorRequest = SignRequest.clone(request);
        errorRequest.error = super.createSignError(`Запрос ${url}`, error);
        return this.doNextHandler(errorRequest);
      };

      return Environment.getSignGateway()
        .getReceiptsForSigning()
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !!request.certificate && request.isGrantedToSign && request.isAutoMode;
  }
}

export default ReceiptsHandler;
