import IndependentDepartmentAddress from './IndependentDepartmentAddress';
import Employee from './Employee';
import EmployeeCertificateForSigningDocuments from './EmployeeCertificateForSigningDocuments';
import EmployeeCertificateForEnterSystem from './EmployeeCertificateForEnterSystem';

/* Обособленное подразделение (Филиал или Представительство) */
export default class IndependentDepartment {
  constructor(data) {
    this._id = data.id;
    this._kpp = data.kpp;
    this._okpo = data.okpo; // у компании тоже есть, но он будет другой!!! (используется в накладной)
    this._title = data.title;
    if (data.address && !(data.address instanceof IndependentDepartmentAddress)) {
      throw new Error('Адрес в подразделении должен быть экземпляром типа IndependentDepartmentAddress');
    }
    this._address = data.address;
    this._employees = new Map();
  }

  addEmployee(employee) {
    if (!(employee instanceof Employee)) {
      throw new Error('Параметр должен быть экземпляром класса legal_entity/Employee');
    }
    this._employees.set(employee.id, employee);
  }

  assignCertificateForSigningDocumentToEmployee(employeeId, certificate) {
    if (!(certificate instanceof EmployeeCertificateForSigningDocuments)) {
      throw new Error('Параметр должен быть экземпляром типа EmployeeCertificateForEnterSystem');
    }
    const employee = this._employees.get(employeeId);
    if (!employee) {
      throw new Error('Невозможно добавить сертификат сотруднику, поскольку такого сотрудника не существует');
    }
    employee.assignCertificateToSignDocument(certificate);
  }

  addCertificateForEnterSystemToEmployee(employeeId, certificate) {
    if (!(certificate instanceof EmployeeCertificateForEnterSystem)) {
      throw new Error('Параметр должен быть экземпляром типа EmployeeCertificateForEnterSystem');
    }

    const employee = this._employees.get(employeeId);
    if (!employee) {
      throw new Error('Невозможно добавить сертификат сотруднику, поскольку такого сотрудника не существует');
    }

    employee.addCertificateToEnterSystem(certificate);
  }

  get kpp() {
    return this._kpp;
  }

  set kpp(value) {
    this._kpp = value;
  }

  get id() {
    return this._id;
  }
}
