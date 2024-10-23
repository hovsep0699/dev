import Certificate from '../common/Certificate';

export default class EmployeeCertificateForEnterSystem {
  constructor(id, certificate, isActive) {
    if (!(certificate instanceof Certificate)) {
      throw new Error('Параметр должен быть экземпляром типа Certificate');
    }

    this._id = id;
    this._certificateData = certificate;
    this._active = isActive;
  }

  set active(isActive) {
    this._active = isActive;
  }

  get active() {
    return this._active;
  }
}
