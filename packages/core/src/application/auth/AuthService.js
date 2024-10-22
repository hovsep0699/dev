import AjaxGetLoginStringHandler from './handlers/auth/AjaxGetLoginStringHandler';
import AjaxEmailPasswordHandler from './handlers/auth/AjaxEmailPasswordHandler';
import SignLoginStringHandler from './handlers/auth/SignLoginStringHandler';
import AjaxCertificateHandler from './handlers/auth/AjaxCertificateHandler';
import AjaxRemindPasswordHandler from './handlers/recover/AjaxRemindPasswordHandler';
import AjaxGetUserInfoHandler from './handlers/hasAuth/AjaxGetUserInfoHandler';
import AjaxGetCompanyInfoHandler from './handlers/hasAuth/AjaxGetCompanyInfoHandler';
import MergeUserDataHandler from './handlers/hasAuth/MergeUserDataHandler';
import MergeUserAndCompanyDataHandler from './handlers/hasAuth/MergeUserAndCompanyDataHandler';
import MergeEmployeeDataHandler from './handlers/hasAuth/MergeEmployeeDataHandler';
import Environment from '../Environment';
import SecurityService from '../security/SecurityService';

class AuthService {
  constructor() {
    const successAuth = () => {
      this._isAuthed = true;
    };

    const ajaxGetLoginStringHandler = new AjaxGetLoginStringHandler();
    const signLoginStringHandler = new SignLoginStringHandler();
    const ajaxEmailPasswordHandler = new AjaxEmailPasswordHandler(successAuth);
    const ajaxCertificateHandler = new AjaxCertificateHandler(successAuth);

    ajaxGetLoginStringHandler
      .setNext(signLoginStringHandler)
      .setNext(ajaxCertificateHandler)
      .setNext(ajaxEmailPasswordHandler);

    this.authChain = ajaxGetLoginStringHandler;
    this.recoverPasswordChain = new AjaxRemindPasswordHandler();

    const ajaxGetUserInfoHandler = new AjaxGetUserInfoHandler();
    const ajaxGetCompanyInfoHandler = new AjaxGetCompanyInfoHandler();
    const mergeUserAndCompanyDataHandler = new MergeUserAndCompanyDataHandler();
    const mergeUserDataHandler = new MergeUserDataHandler();
    const mergeEmployeeDataHandler = new MergeEmployeeDataHandler();

    ajaxGetUserInfoHandler
      .setNext(ajaxGetCompanyInfoHandler)
      .setNext(mergeUserAndCompanyDataHandler)
      .setNext(mergeUserDataHandler)
      .setNext(mergeEmployeeDataHandler);

    this.checkAuthChain = ajaxGetUserInfoHandler;

    this._isAuthed = false;
  }

  get isAuthed() {
    return this._isAuthed;
  }

  auth(request) {
    return this.authChain.auth(request);
  }

  recover(request) {
    return this.recoverPasswordChain.recover(request);
  }

  async hasAuth(request) {
    let user, company, certificate;

    try {
      const response = await this.checkAuthChain.hasAuth(request);
      this._isAuthed = response.isAuthed;
      user = response.user;
      company = response.company;
      certificate = response.certificate;
    } catch (error) {
      console.log(error)
      // TODO: обработка ошибки
    }

    return { user, company, certificate };
  }

  async exit() {
    const successHandler = exitResult => {
      this._isAuthed = false;
      SecurityService.clear();
      return exitResult;
    };

    return Environment.getAuthGateway()
      .exit()
      .then(successHandler);
  }
}

const instance = new AuthService();
export default instance;
