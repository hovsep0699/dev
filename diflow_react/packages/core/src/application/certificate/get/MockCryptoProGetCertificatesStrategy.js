import GetSertificatesStrategy from './GetCertificatesStrategy';

export default class MockCryptoProGetCertificatesStrategy extends GetSertificatesStrategy {
  constructor(mockJson) {
    super();
    this._promiseCertificates = Promise.resolve(mockJson);
  }

  get() {
    return this._promiseCertificates;
  }
}
