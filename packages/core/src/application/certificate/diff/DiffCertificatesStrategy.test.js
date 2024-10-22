import DiffCertificatesStrategy from './DiffCertificatesStrategy';

describe('Test diff ', () => {
  test('abstract class', () => {
    const abstractDiffStrategy = new DiffCertificatesStrategy();
    return expect(() => abstractDiffStrategy.diff()).toThrowError('Invoke this method in subclass');
  });
});
