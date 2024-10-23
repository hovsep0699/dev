import SignHandlerBase from '../SignHandlerBase';
import SignRequest from '../../SignRequest';
import { CertificateService } from '../../../certificate/CertificateService';

class CreateSignHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    if (this.canHandle(request)) {
      const successHandler = signature => {
        const documentRequest = SignRequest.clone(request);
        documentRequest.addSignature(signature);
        return this.doNextHandler(documentRequest);
      };

      const failHandler = error => {
        const failureRequest = SignRequest.clone(request);
        failureRequest.addSignFailure({
          id: request.documentToSign.id,
          step: 'CreateSignHandler',
          error
        });
        return this.doNextHandler(failureRequest);
      };
      return CertificateService.sign(request.documentToSign.content, request.certificate.thumbprint)
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
      request.documentToSign?.content
    );
  }
}

export default CreateSignHandler;
