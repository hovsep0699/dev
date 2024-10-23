import RegisterHandlerBase from './RegisterHandlerBase';
import { CertificateService } from '../../certificate/CertificateService';
import RegisterRequest from '../RegisterRequest';

class SignLoginStringHandler extends RegisterHandlerBase {
  register(request) {
    super.register(request);
    if (this.canHandle(request)) {
      const successHandler = (loginStringSignedData) => {
        const signedLoginStringRequest = RegisterRequest.clone(request);
        signedLoginStringRequest.loginStringSignedData = loginStringSignedData;
        return this.doNextHandler(signedLoginStringRequest);
      };

      const failHandler = (error) => {
        const errorRequest = RegisterRequest.clone(request);
        errorRequest.error = super.createRegisterError('CertificateService.sign см. SignLoginStringHandler', error);
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
