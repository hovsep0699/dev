import Employee from './Employee';
import OGRN from './vo/OGRN';
import INN from './vo/INN';
import KPP from './vo/KPP';
import OKPO from './vo/OKPO';
import IFNS from '../ifns/IFNS';
import BankDetails from '../bank/BankDetails';
import errFactory from '../../application/error/ErrorFactory';
import { CHANGE_COMPANY } from '../../application/error/Error';
import LegalAddress from '../common/LegalAddress';

export default class Company {

  constructor(localId, id, inn, ogrn, name) {
    this._localId = localId; // ID компании в базе данных
    this._id = id; // Идентификатор участника KSR201811140012b8b58b0cb004d61beb1aa315cd86001
    this._inn = new INN(inn);
    this._ogrn = new OGRN(ogrn);
    this._name = name;

    this._bankDetails = null;
    this._ifns = null;

    this._employees = new Map();
    this._independentDepartments = new Map();
    this._internalDepartments = new Map();
    this._mainDepartment = null;
  }

  setDetails(kpp, okpo, ifns, bankDetails) {
    if (!(kpp instanceof KPP)) {
      throw errFactory(CHANGE_COMPANY, 'Параметр должен быть экземпляром класса KPP');
    }
    if (!(okpo instanceof OKPO)) {
      throw errFactory(CHANGE_COMPANY, 'Параметр должен быть экземпляром класса OKPO');
    }
    if (!(ifns instanceof IFNS)) {
      throw errFactory(CHANGE_COMPANY, 'Параметр должен быть экземпляром класса IFNS');
    }
    if (!(bankDetails instanceof BankDetails)) {
      throw errFactory(CHANGE_COMPANY, 'Параметр должен быть экземпляром класса BankDetails');
    }

    this.kpp = kpp;
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

  addEmployee(employee, isCurrent = false) {
    if (!(employee instanceof Employee)) {
      throw new Error('Параметр должен быть экземпляром класса Employee');
    }
    this._employees.set(employee.id, employee);
    if (isCurrent) this._currentEmployeeId = employee.id;
  }

  set mainDepartment(value) {
    this._mainDepartment = value;
  }

  get mainDepartment() {
    return this._mainDepartment;
  }

  get employee() {
    return this._employees.get(this._currentEmployeeId);
  }

  get employees() {
    return this._employees;
  }

  get independentDepartments() {
    return this._independentDepartments;
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

  get ogrn() {
    return this._ogrn;
  }

  get name() {
    return this._name;
  }

  get inn() {
    return this._inn;
  }

  set kpp(value) {
    this.independentDepartments.get(this.id).kpp = value;
  }

  get kpp() {
    if (this.independentDepartments.has(this.id)) {
      return this.independentDepartments.get(this.id).kpp;
    }
    return null;
  }

  set okpo(value) {
    this._okpo = value;
  }

  get okpo() {
    return this._okpo;
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
    return 'UL';
  }
}
