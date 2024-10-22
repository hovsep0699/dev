import AuthHandlerBase from '../AuthHandlerBase';
import { CertificateService } from '../../../certificate/CertificateService';
import AuthRequest from '../../AuthRequest';

class SignLoginStringHandler extends AuthHandlerBase {
  auth(request) {
    super.auth(request);
    if (this.canHandle(request)) {
      const successHandler = (loginStringSignedData) => {
        const signedLoginStringRequest = AuthRequest.clone(request);
        signedLoginStringRequest.loginStringSignedData = loginStringSignedData;
        return this.doNextHandler(signedLoginStringRequest);
      };
      const failHandler = (error) => {
        const errorRequest = AuthRequest.clone(request);
        errorRequest.error = super.createAuthError('Не удалось подписать loginString', error);
        return this.doNextHandler(errorRequest);
      };
      return CertificateService.sign(request.loginString, request.certificate.thumbprint)
        .then(successHandler)
        .catch(failHandler);
    }
    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    return !!request.loginString && !!request.certificate;
  }
}

export default SignLoginStringHandler;
