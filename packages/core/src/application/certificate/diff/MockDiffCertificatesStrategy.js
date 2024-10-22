import DiffCertificatesStrategy from './DiffCertificatesStrategy';

export default class MockDiffCertificatesStrategy extends DiffCertificatesStrategy {
  constructor(mockJson) {
    super();
    this.mock = mockJson;
  }

  diff(thumbprints) {
    const result = { thumbprints: [] };
    result.thumbprints = thumbprints.map((thumbprint) => {
      const isHasThumbprintInServerRes = this.mock.thumbprints.some(value => value.thumbprint === thumbprint);
      const cert = this.mock.thumbprints.find(value => value.thumbprint === thumbprint);
      return {
        thumbprint,
        is_active: cert ? cert.is_active : false,
        isHasThumbprintInServerRes,
      };
    });
    return Promise.resolve(result);
  }
}
