import GetCertificatesStrategy from './GetCertificatesStrategy';

describe('Test get certificates ', () => {
  test('abstract class', () => {
    const abstractStrategy = new GetCertificatesStrategy();
    return expect(() => abstractStrategy.get()).toThrowError('Invoke this method in subclass');
  });
});
