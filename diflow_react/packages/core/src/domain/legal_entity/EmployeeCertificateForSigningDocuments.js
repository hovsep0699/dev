import Certificate from '../common/Certificate';

export default class EmployeeCertificateForSigningDocuments {
  constructor(id, certificate) {
    if (!(certificate instanceof Certificate)) {
      throw new Error('Параметр должен быть экземпляром типа Certificate');
    }

    this._id = id;
    this._certificateData = certificate;
  }
}
