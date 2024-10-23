import HasAuthHandlerBase from '../HasAuthHandlerBase';
import AuthRequest from '../../AuthRequest';

class MergeEmployeeDataHandler extends HasAuthHandlerBase {
  hasAuth(request) {
    if (this.canHandle(request)) {
      const req = AuthRequest.clone(request);
      req.employee = this.createEmployee(request);
      return this.doNextHandler(req);
    }

    return this.doNextHandler(request);
  }

  canHandle(request) {
    super.canHandle(request);
    const { isAuthed, rawUser } = request;

    if (!isAuthed || !rawUser || !rawUser.employee) {
      return false;
    }

    return !!rawUser;
  }

  createEmployee(request) {
    return request.rawUser.employee;
  }
}

export default MergeEmployeeDataHandler;
