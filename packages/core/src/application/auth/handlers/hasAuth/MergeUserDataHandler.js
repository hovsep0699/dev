import HasAuthHandlerBase from '../HasAuthHandlerBase';
import AuthRequest from '../../AuthRequest';

import SecurityService from '../../../security/SecurityService';
import Certificate from '../../../../domain/common/Certificate';

class MergeUserDataHandler extends HasAuthHandlerBase {
  hasAuth(request) {
    if (this.canHandle(request)) {
      const req = AuthRequest.clone(request);

      req.user = this.createUser(request);
      if (request.certificate) {
        req.certificate = this.createCertificate(request);
      } else {
        req.certificate = null
      }
      req.isAuthed = true;

      return this.doNextHandler(req);
    }

    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    const { isAuthed, rawUser } = request;

    if (!isAuthed || !rawUser) {
      return false;
    }

    return !!rawUser;
  }

  createUser(request) {
    let user;
    const { rawUser } = request;

    rawUser.roles.forEach(role => {
      SecurityService.addRole(role);
    });

    user = rawUser;

    return user;
  }

  createCertificate(request) {
    const { active, thumbprint, valid_from, valid_until } = request.rawUser.certificate;
    return new Certificate(null, thumbprint, valid_from, valid_until, null, active);
  }
}

export default MergeUserDataHandler;
