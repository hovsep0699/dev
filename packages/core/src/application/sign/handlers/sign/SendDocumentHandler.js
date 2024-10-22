import SignHandlerBase from '../SignHandlerBase';
import Environment from '../../../Environment';
import SignRequest from '../../SignRequest';
import DocumentContentHandler from './DocumentContentHandler';
import CreateSignHandler from './CreateSignHandler';
import SendSignHandler from './SendSignHandler';

class SendDocumentHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    if (this.canHandle(request)) {
      const successHandler = response => {
        if (
          response.id &&
          ['invoice', 'invoice_correction'].includes(request.documentToSign.flowType)
        ) {
          const invoiceRequest = new SignRequest({
            certificate: request.certificate,
            isGrantedToSign: request.isGrantedToSign,
            documentToSign: response
          });
          const documentContentHandler = new DocumentContentHandler();
          const createSignHandler = new CreateSignHandler();
          const sendSignHandler = new SendSignHandler();
          documentContentHandler.setNext(createSignHandler).setNext(sendSignHandler);
          const invoiceResponse = documentContentHandler.sign(invoiceRequest);
          console.log('invoiceResponse', invoiceResponse);
        }
        if (response.data?.success) {
          return this.doNextHandler(SignRequest.clone(request));
        } else {
          return failHandler(response);
        }
      };

      const failHandler = error => {
        const failureRequest = SignRequest.clone(request);
        failureRequest.addSignFailure({
          id: request.documentToSign.id,
          step: 'SendDocumentHandler',
          error
        });
        return this.doNextHandler(failureRequest);
      };
      const document = request.documentToSign;
      return Environment.getSignGateway()
        .sendDocument(document.id, document.flowType, document.flowGroup)
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    const docIsSigned = request.signedDocumentIds.has(request.documentToSign.packageId);
    return !!request.certificate && request.isGrantedToSign && docIsSigned;
  }
}

export default SendDocumentHandler;
