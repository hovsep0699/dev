import SignHandlerBase from '../SignHandlerBase';
import Environment from '../../../Environment';
import SignRequest from '../../SignRequest';

class DocumentContentHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    if (this.canHandle(request)) {
      const successHandler = response => {
        const documentRequest = SignRequest.clone(request);
        documentRequest.addContent(response.content);
        documentRequest.addFileName(response.file_name);
        return this.doNextHandler(documentRequest);
      };

      const failHandler = error => {
        const failureRequest = SignRequest.clone(request);
        failureRequest.addSignFailure({
          id: request.documentToSign.id,
          step: 'DocumentContentHandler',
          error
        });
        return this.doNextHandler(failureRequest);
      };
      return Environment.getSignGateway()
        .getDocumentContent(request.documentToSign.id)
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    const docIsSigned = request.signedDocumentIds.has(request.documentToSign.packageId);
    return (
      !!request.certificate && request.isGrantedToSign && request.documentToSign && !docIsSigned
    );
  }
}

export default DocumentContentHandler;
