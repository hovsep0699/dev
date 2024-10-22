import AjaxGetParametersHandler from './handlers/AjaxGetParametersHandler';
import AjaxGetLoginStringHandler from './handlers/AjaxGetLoginStringHandler';
import SignLoginStringHandler from './handlers/SignLoginStringHandler';
import AjaxCertificateRegisterHandler from './handlers/AjaxCertificateRegisterHandler';
import ValidateRegisterHandler from './handlers/ValidateRegisterHandler';
import AjaxRegisterHandler from './handlers/AjaxRegisterHandler';
import UserInputHandler from './handlers/UserInputHandler';

class RegisterService {
  constructor() {
    const successRegistration = () => { this._isRegistered = true; };

    const validateRegister = new ValidateRegisterHandler();
    const ajaxRegister = new AjaxRegisterHandler(successRegistration);
    const ajaxGetLoginStringHandler = new AjaxGetLoginStringHandler();
    const signLoginStringHandler = new SignLoginStringHandler();
    const ajaxGetParametersHandler = new AjaxGetParametersHandler();
    const userInputHandler = new UserInputHandler();
    const ajaxCertificateRegister = new AjaxCertificateRegisterHandler(successRegistration);

    validateRegister
      .setNext(ajaxRegister)
      .setNext(ajaxGetLoginStringHandler)
      .setNext(signLoginStringHandler)
      .setNext(ajaxGetParametersHandler)
      .setNext(userInputHandler)
      .setNext(ajaxCertificateRegister);

    this.chainOfResponsibility = validateRegister;
    this._isRegistered = false;
  }

  register(request) {
    return this.chainOfResponsibility.register(request);
  }

  get isRegistered() {
    return this._isRegistered;
  }
}

const instance = new RegisterService();
export default instance;
