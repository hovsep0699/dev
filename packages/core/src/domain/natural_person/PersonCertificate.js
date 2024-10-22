import Certificate from '../common/Certificate';

export default class PersonCertificate {
  constructor(certificate) {
    if (!(certificate instanceof Certificate)) {
      throw new Error('Параметр должен быть экземпляром типа Certificate');
    }
    this._id = certificate.id;
    this._certificateData = certificate;
  }

  set active(isActive) {
    this._active = isActive;
  }

  get active() {
    return this._active;
  }
}
