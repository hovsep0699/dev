import EmployeeCertificateForSigningDocuments from './EmployeeCertificateForSigningDocuments';
import EmployeeCertificateForEnterSystem from './EmployeeCertificateForEnterSystem';

export const ACTIVE_STATUS = 'active';
export const INACTIVE_STATUS = 'inactive';
export const WAITING_STATUS = 'waiting_for_approval';

export default class Employee {
  constructor(employee, certificateToEnterSystem = null) {
    this._id = employee.id;
    this._email = employee.email;
    this._surname = employee.surname;
    this._name = employee.name;
    this._patronymic = employee.patronymic;
    this._position = employee.position;
    this._socialNumber = employee.socialNumber;
    this._status = employee.status_system_name;
    if (certificateToEnterSystem) {
      this._certificatesToEnterSystem = new Map();
      this._certificatesToEnterSystem.set(certificateToEnterSystem.id, certificateToEnterSystem);
    }
  }

  assignCertificateToSignDocument(certificate) {
    if (!(certificate instanceof EmployeeCertificateForSigningDocuments)) {
      throw new Error('Параметр должен быть экземпляром класса EmployeeCertificateForSigningDocuments');
    }
    this._certificateToSignDocument = certificate;
  }

  addCertificateToEnterSystem(certificate) {
    if (!(certificate instanceof EmployeeCertificateForEnterSystem)) {
      throw new Error('Параметр должен быть экземпляром класса EmployeeCertificateForEnterSystem');
    }
    if (!this._certificatesToEnterSystem) {
      throw new Error('Пользователь зарегистрировался по логину и паролю, нельзя добавить сертификат для входа в систему. Нужно создать нового пользователя');
    }
    this._certificatesToEnterSystem.set(certificate.id, certificate);
  }

  static isStatusValid(status) {
    return status === ACTIVE_STATUS
    || status === INACTIVE_STATUS
    || status === WAITING_STATUS;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get surname() {
    return this._surname;
  }

  get name() {
    return this._name;
  }

  get patronymic() {
    return this._patronymic;
  }

  get position() {
    return this._position;
  }

  get status() {
    return this._status;
  }

  get socialNumber() {
    return this._socialNumber;
  }
}
