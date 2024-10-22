import Employee from './Employee';
import INN from './vo/INN';
import OGRNIP from './vo/OGRNIP';
import OKPO from './vo/OKPO';
import errFactory from '../../application/error/ErrorFactory';
import { CHANGE_COMPANY } from '../../application/error/Error';
import IFNS from '../ifns/IFNS';
import BankDetails from '../bank/BankDetails';
import LegalAddress from '../common/LegalAddress';

export default class Company {
  constructor(localId, id, inn, ogrnip, name) {
    this._localId = localId; // ID компании в базе данных
    this._id = id; // Идентификатор участника KSR201811140012b8b58b0cb004d61beb1aa315cd86001
    this._inn = new INN(inn);
    this._ogrnip = new OGRNIP(ogrnip);
    this._name = name;

    this._bankDetails = null;
    this._ifns = null;

    this._employees = new Map();
    this._internalDepartments = new Map();
    this._mainDepartment = null;
  }

  setDetails(okpo, ifns, bankDetails) {
    if (!(okpo instanceof OKPO)) {
      // throw errFactory(CHANGE_COMPANY, 'Параметр должен быть экземпляром класса OKPO');
    }
    if (!(ifns instanceof IFNS)) {
      throw errFactory(CHANGE_COMPANY, 'Параметр должен быть экземпляром класса IFNS');
    }
    if (!(bankDetails instanceof BankDetails)) {
      throw errFactory(CHANGE_COMPANY, 'Параметр должен быть экземпляром класса BankDetails');
    }

    this.okpo = okpo;
    this.ifns = ifns;
    this.bankDetails = bankDetails;

    this.state.setDetails();
  }

  setAddress(legalAddress) {
    if (!(legalAddress instanceof LegalAddress)) {
      throw errFactory(CHANGE_COMPANY, 'Параметр должен быть экземпляром класса LegalAddress(для юридической компании)');
    }
    this._legalAddress = legalAddress;

    this.state.setAddress();
  }

  addEmployee(employee) {
    if (!(employee instanceof Employee)) {
      throw new Error('Параметр должен быть экземпляром класса Employee');
    }
    this._employees.set(employee.id, employee);
  }

  set mainDepartment(value) {
    this._mainDepartment = value;
  }

  get mainDepartment() {
    return this._mainDepartment;
  }

  get internalDepartments() {
    return this._internalDepartments;
  }

  get id() {
    return this._id;
  }

  get localId() {
    return this._localId;
  }

  get name() {
    return this._name;
  }

  get ogrnip() {
    return this._ogrnip;
  }

  get inn() {
    return this._inn;
  }

  get okpo() {
    return this._okpo;
  }

  set okpo(value) {
    this._okpo = value;
  }

  get ifns() {
    return this._ifns;
  }

  set ifns(value) {
    this._ifns = value;
  }

  get bankDetails() {
    return this._bankDetails;
  }

  set bankDetails(value) {
    this._bankDetails = value;
  }

  set legalAddress(value) {
    this._legalAddress = value;
  }

  get legalAddress() {
    return this._legalAddress;
  }

  get type() {
    return 'IP';
  }
}
