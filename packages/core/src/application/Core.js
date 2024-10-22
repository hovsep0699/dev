import AuthService from './auth/AuthService';
import RegisterService from './register/RegisterService';
import SignService from './sign/SignService';
import SecurityService from './security/SecurityService';
import ParameterService from './parameters/ParameterService';

import AuthRequest from './auth/AuthRequest';
import RegisterRequest from './register/RegisterRequest';
import RecoverRequest from './auth/RecoverRequest';
import SignRequest from './sign/SignRequest';

import ULCompany from '../domain/legal_entity/Company';
import IPCompany from '../domain/individual_entrepreneur/Company';

import EventManager from './EventManager';
import SettingsService from './settings/SettingsService';

import errFactory from './error/ErrorFactory';
import { CHANGE_COMPANY } from './error/Error';
import Environment from './Environment';
import AjaxGetEmployeesHandler from './company/handlers/AjaxGetEmployeesHandler';
import ULEmployee, { ACTIVE_STATUS as UL_ACTIVE_STATUS } from '../domain/legal_entity/Employee';
import IPEmployee, {
  ACTIVE_STATUS as IP_ACTIVE_STATUS
} from '../domain/individual_entrepreneur/Employee';
import get from 'get-value';

class Core {
  constructor() {
    this._user = null;
    this._company = null;
    this._certificate = null;
    this._events = new EventManager();
    this._parameters = null;
  }

  async init(request) {
    const { user, company, certificate } = await AuthService.hasAuth(request);
    this._parameters = await this.getParameters();

    if (AuthService.isAuthed) {
      this._user = user;
      this._company = company;
      this._certificate = certificate;
    }
    try {
      // TODO: обработка ошибки
      await SettingsService.getNotifications();
    } catch (err) {}
  }

  async auth(params) {
    const request = new AuthRequest(params);
    const authResult = await AuthService.auth(request);
    if (authResult.success) {
      await this.init(request);
    }
    return authResult;
  }

  async checkReceipts() {
    if (SecurityService.hasRole('ROLE_RECEIPTS_AUTOSIGNING')) {
      await this.startReceiptsAutoSigning();
    } else {
      SignService.events.notify('checkSigningList');
    }
  }

  async startReceiptsAutoSigning() {
    const request = new SignRequest();
    const signResult = await SignService.signReceipts(request);
    return signResult;
  }

  async startReceiptsManualSigning(receipts) {
    const request = new SignRequest({ documents: receipts, isAutoMode: false });
    const signResult = await SignService.signReceipts(request);
    return signResult;
  }

  isAuthed() {
    return AuthService.isAuthed;
  }

  recover(params) {
    const request = new RecoverRequest(params);
    return AuthService.recover(request);
  }

  register(params) {
    const request = new RegisterRequest(params);
    return RegisterService.register(request);
  }

  async getParameters() {
    return ParameterService.getPrameters();
  }

  isRegistered() {
    return RegisterService.isRegistered;
  }

  logout() {
    return AuthService.exit().then(res => {
      this.events.notify('logout');
      return res;
    });
  }

  async setCompanyDetails(raw) {
    const { kpp, okpo, ifns, bankDetails } = raw;

    const url = '/front/cabinet/company';
    try {
      const formData = new FormData();
      const accountNumberValue = get(bankDetails, 'accountNumber.value') || '';
      const bikValue = get(bankDetails, 'bik.value') || '';
      const okpoValue = (okpo && okpo.value) || '';
      const ifnsValue = (ifns && ifns.id) || '';

      formData.append('accountNumber', accountNumberValue);
      formData.append('bik', bikValue);
      formData.append('division[classificationNumber]', okpoValue);
      formData.append('taxAuthority', ifnsValue);

      if (this.company instanceof ULCompany) {
        const kppValue = (kpp && kpp.value) || '';
        formData.append('division[kpp]', kppValue);
      }

      const response = await Environment.getCompanyGateway().setDetails(url, formData);
      if (response.data.success) {
        if (this.company instanceof ULCompany) {
          this.company.setDetails(kpp, okpo, ifns, bankDetails);
        }

        if (this.company instanceof IPCompany) {
          this.company.setDetails(okpo, ifns, bankDetails);
        }
      }
    } catch (error) {
      throw errFactory(CHANGE_COMPANY, `Запрос ${url}`, error);
    }
  }

  async setCompanyLegalAddress(legalAddress) {
    const RUSSIA_COUNTRY_CODE = 172;
    const url = '/front/cabinet/address';
    try {
      const processOptField = field => {
        if (typeof field !== 'object' || (field && !field.value)) return '';
        return field.value;
      };
      const formData = new FormData();
      formData.append('postalCode', processOptField(legalAddress.postalCode));
      formData.append('region', legalAddress.region.id);
      formData.append('district', processOptField(legalAddress.district));
      formData.append('city', processOptField(legalAddress.city));
      formData.append('settlement', processOptField(legalAddress.settlement));
      formData.append('street', processOptField(legalAddress.street));
      formData.append('house', processOptField(legalAddress.house));
      formData.append('building', processOptField(legalAddress.building));
      formData.append('room', processOptField(legalAddress.room));
      formData.append('country', RUSSIA_COUNTRY_CODE);

      const response = await Environment.getCompanyGateway().setAddress(url, formData);
      if (response.data.success) {
        this.company.setAddress(legalAddress);
      }
    } catch (error) {
      throw errFactory(CHANGE_COMPANY, `Запрос ${url}`, error);
    }
  }

  updateNotificationSettings(settings) {
    return SettingsService.updateNotifications(settings);
  }

  async getEmployees(status, offset = 0, limit = 10) {
    let statusSystemName = '';
    if (this.company instanceof ULCompany) {
      statusSystemName = ULEmployee.isStatusValid(status) ? status : UL_ACTIVE_STATUS;
    }
    if (this.company instanceof IPCompany) {
      statusSystemName = IPEmployee.isStatusValid(status) ? status : IP_ACTIVE_STATUS;
    }
    const params = {
      statusSystemName,
      hash: 'staff',
      offset,
      limit
    };
    return AjaxGetEmployeesHandler.get(this.company, params);
  }

  get notificationsSettings() {
    return SettingsService.getNotifications();
  }

  get company() {
    return this._company;
  }

  get user() {
    return this._user;
  }

  get certificate() {
    return this._certificate;
  }

  get events() {
    return this._events;
  }

  get parameters() {
    return this._parameters;
  }
}

const instance = new Core();
export default instance;
