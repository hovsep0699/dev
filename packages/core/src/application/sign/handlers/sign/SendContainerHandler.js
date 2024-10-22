import SignHandlerBase from '../SignHandlerBase';
import Environment from '../../../Environment';
import SignRequest from '../../SignRequest';
import getFormData from '../../../utils/getFormData';

class SendContainerHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    if (this.canHandle(request)) {
      const successHandler = response => {
        if (response.data?.success) {
          return this.doNextHandler(SignRequest.clone(request));
        } else {
          return failHandler(response);
        }
      };

      const failHandler = error => {
        const failureRequest = SignRequest.clone(request);
        console.log('SendContainerHandler fail response ', error);
        failureRequest.error = this.createSignError('SendContainerHandler fail', null, error);
        return this.doNextHandler(failureRequest);
      };
      const formDataIds = getFormData(request.signedDocumentIds, 'packageIds[]');
      return Environment.getSignGateway()
        .sendContainer(formDataIds)
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    const allDocsSigned = request.documents.length === request.signedDocumentIds.size;
    return (
      !!request.certificate &&
      request.isGrantedToSign &&
      allDocsSigned &&
      !request.signFailures?.length
    );
  }
}

export default SendContainerHandler;
