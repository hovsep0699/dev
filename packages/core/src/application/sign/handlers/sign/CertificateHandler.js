import SignHandlerBase from '../SignHandlerBase';
import SignRequest from '../../SignRequest';
import Core from '../../../Core';

class CertificateHandler extends SignHandlerBase {
  sign(request) {
    super.sign(request);
    const certificate = Core.certificate;
    if (certificate && certificate.thumbprint) {
      const signRequest = SignRequest.clone(request);
      signRequest.certificate = certificate;
      return this.doNextHandler(signRequest);
    } else {
      const errorRequest = SignRequest.clone(request);
      errorRequest.error = super.createSignError(`Не хватает данных о сертификате`);
      return this.doNextHandler(errorRequest);
    }
  }
}

export default CertificateHandler;
