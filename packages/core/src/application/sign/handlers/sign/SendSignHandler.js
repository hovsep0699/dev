import SignHandlerBase from '../SignHandlerBase';
import Environment from '../../../Environment';
import SignRequest from '../../SignRequest';

class SendSignHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    if (this.canHandle(request)) {
      const successHandler = response => {
        if (response.data?.success) {
          const signSendedRequest = SignRequest.clone(request);
          const documentId = request.documentToSign.packageId || request.documentToSign.id;
          signSendedRequest.addSignedDocumentId(documentId);
          return this.doNextHandler(signSendedRequest);
        } else {
          return failHandler(response);
        }
      };

      const failHandler = error => {
        const failureRequest = SignRequest.clone(request);
        failureRequest.addSignFailure({
          id: request.documentToSign.id,
          step: 'SendSignHandler',
          error
        });
        return this.doNextHandler(failureRequest);
      };
      const document = request.documentToSign;
      const formData = new FormData();
      formData.append('sign', document.signature);
      formData.append('file_name', document.fileName);
      return Environment.getSignGateway()
        .sendSign(document.id, formData)
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    const docIsSigned = request.signedDocumentIds.has(request.documentToSign.packageId);
    return (
      !!request.certificate &&
      request.isGrantedToSign &&
      !docIsSigned &&
      request.documentToSign?.signature &&
      request.documentToSign?.fileName
    );
  }
}

export default SendSignHandler;
