import SignHandlerBase from '../SignHandlerBase';
import SignRequest from '../../SignRequest';
import SignService from '../../SignService';

class SignDocumentsProcessHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    if (this.canHandle(request)) {
      SignService.events.notify('startSignProcess', request);

      const counter = request.counter;
      const allDocumentsProcessed = counter >= request.total;
      if (allDocumentsProcessed) {
        this.handleSignProcessEnding(request);
        SignService.events.notify('endSignProcess', request);
        return this.doNextHandler(request);
      }
      const signProcessChain = SignService.getSignAndSendDocumentsProcessChain();
      this.setNext(signProcessChain);

      const nextDocumentRequest = SignRequest.clone(request);
      nextDocumentRequest.incrementCounter();
      nextDocumentRequest.documentToSign = request.documents[counter];

      SignService.events.notify('startSignProcessIteration', nextDocumentRequest);

      return this.doNextHandler(nextDocumentRequest);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !!request.certificate && request.isGrantedToSign && request.documents?.length;
  }

  showSignFailures(signFailure) {
    const { error } = signFailure;
    const messages = error?.response?.data?.messages;
    throw new Error(messages);
  }

  handleSignProcessEnding(request) {
    const signFailures = request.signFailures;
    if (signFailures && signFailures.length) {
      this.showSignFailures(signFailures[0]);
    }
  }
}

export default SignDocumentsProcessHandler;
