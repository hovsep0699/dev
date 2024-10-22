import { CertificateService } from './CertificateService';
import DomainCertificate from '../../domain/common/Certificate';
import MockCryptoProGetCertificatesStrategy from './get/MockCryptoProGetCertificatesStrategy';
import MockDiffCertificatesStrategy from './diff/MockDiffCertificatesStrategy';
import MockSignStrategy from './sign/MockCryptoProSignStrategy';
import GetCertificatesStrategy from './get/GetCertificatesStrategy';
import SignStrategy from './sign/SignStrategy';
import DiffCertificatesStrategy from './diff/DiffCertificatesStrategy';

import certs_mock from '../../mocks/certs/crypto_pro_certs';
import diff_mock_all_active from '../../mocks/200/diffs_certs_all_active';
import diff_mock_all_inactive from '../../mocks/200/diffs_certs_all_inactive';
import diff_mock_certs_only_last_inactive from '../../mocks/200/diffs_certs_only_last_inactive';
import sign_mock from '../../mocks/certs/crypto_pro_sign_2EE15735399431F18E3C16EFC1FF6902F4C15D3E';

expect.extend({
  toBeArrayOfClassInstances(received, Class) {
    const isArray = Array.isArray(received);
    const hasLength = received.length;
    const isNotClassInstance = received.some(obj => !(obj instanceof Class));

    return {
      message: () => `expected to be Array<${Class.name}>(length > 0)`,
      pass: isArray && hasLength && !isNotClassInstance,
    };
  },
  toBeInstanceOf(received, Class) {
    const isInstance = received instanceof Class;
    return {
      message: () => `expected to be ${Class.name}`,
      pass: isInstance,
    };
  },
});

describe('Pass wrong parameters', () => {
  test('setter getCertificatesStrategy', () => expect(() => CertificateService.getCertificatesStrategy = null).toThrowError('Параметр должен быть подклассом GetCertificatesStrategy'));
  test('setter signStrategy', () => expect(() => CertificateService.signStrategy = null).toThrowError('Параметр должен быть подклассом SignStrategy'));
  test('setter diffCertificatesStrategy', () => expect(() => CertificateService.diffCertificatesStrategy = null).toThrowError('Параметр должен быть подклассом DiffCertificatesStrategy'));
});

describe('Gettings certificates (ALL ACTIVE) Total Num is 8', () => {
  beforeEach(() => {
    CertificateService.getCertificatesStrategy = new MockCryptoProGetCertificatesStrategy(certs_mock);
    CertificateService.diffCertificatesStrategy = new MockDiffCertificatesStrategy(diff_mock_all_active);
  });
  test('Register certs must be 0', () => expect(CertificateService.getRegisterCertificates()).resolves.toHaveLength(0));
  test('All certs len is 8', () => expect(CertificateService.getAllCertificates()).resolves.toHaveLength(8));
  test('Login certs len is 8', () => expect(CertificateService.getLoginCertificates()).resolves.toHaveLength(8));
  test('Return array of domain (All) ', () => expect(CertificateService.getAllCertificates()).resolves.toBeArrayOfClassInstances(DomainCertificate));
  test('Return array of domain (Login) ', () => expect(CertificateService.getLoginCertificates()).resolves.toBeArrayOfClassInstances(DomainCertificate));
  test('Check getCertificateStrategy', () => expect(CertificateService.getCertificatesStrategy).toBeInstanceOf(GetCertificatesStrategy));
  test('getter diffCertificatesStrategy', () => expect(CertificateService.diffCertificatesStrategy).toBeInstanceOf(DiffCertificatesStrategy));
});

describe('Return good DomainCertificate filled objects', () => {
  beforeEach(() => {
    CertificateService.getCertificatesStrategy = new MockCryptoProGetCertificatesStrategy(certs_mock);
    CertificateService.diffCertificatesStrategy = new MockDiffCertificatesStrategy(diff_mock_all_inactive);
  });
  test('Check have all fields', () => {
    expect.assertions(4);
    return CertificateService.getRegisterCertificates().then((certificates) => {
      expect(certificates[0].serialNumber).toBe('61118CFB000300000187');
      expect(certificates[0].thumbprint).toBe('08E52A95D0CA1FD999CD6B638A75E815F67BB300');
      expect(certificates[0].validFrom).toBe('2018-09-03T08:26:00.000Z');
      expect(certificates[0].validTo).toBe('2019-12-03T08:36:00.000Z');
    });
  });
});

describe('Gettings certificates (ALL INACTIVE) Total Num is 8', () => {
  beforeEach(() => {
    CertificateService.getCertificatesStrategy = new MockCryptoProGetCertificatesStrategy(certs_mock);
    CertificateService.diffCertificatesStrategy = new MockDiffCertificatesStrategy(diff_mock_all_inactive);
  });
  test('Register certs must be 8', () => expect(CertificateService.getRegisterCertificates()).resolves.toHaveLength(8));
  test('All certs len is 8', () => expect(CertificateService.getAllCertificates()).resolves.toHaveLength(8));
  test('Login certs len is 0', () => expect(CertificateService.getLoginCertificates()).resolves.toHaveLength(0));
  test('Return array of domain (All) ', () => expect(CertificateService.getAllCertificates()).resolves.toBeArrayOfClassInstances(DomainCertificate));
  test('Return array of domain (Register) ', () => expect(CertificateService.getRegisterCertificates()).resolves.toBeArrayOfClassInstances(DomainCertificate));
});

describe('Gettings certificates (ONLY LAST IS INACTIVE) Total Num is 8', () => {
  beforeEach(() => {
    CertificateService.getCertificatesStrategy = new MockCryptoProGetCertificatesStrategy(certs_mock);
    CertificateService.diffCertificatesStrategy = new MockDiffCertificatesStrategy(diff_mock_certs_only_last_inactive);
  });
  test('Register certs must be 1', () => expect(CertificateService.getRegisterCertificates()).resolves.toHaveLength(1));
  test('All certs len is 8', () => expect(CertificateService.getAllCertificates()).resolves.toHaveLength(8));
  test('Login certs len is 7 ', () => expect(CertificateService.getLoginCertificates()).resolves.toHaveLength(7));
});

describe('Check sign', () => {
  beforeEach(() => {
    CertificateService.signStrategy = new MockSignStrategy(sign_mock);
  });
  test('Sign any message', () => expect(CertificateService.sign('any message (does not matter)', sign_mock.thumbprint)).resolves.toMatch('MIINPwYJKoZIhvcNAQcCoIINMDCCDSwCAQExDDAKBgYqhQMCAgkFADALBgkqhkiG9w0BBwGgggjX'));
  test('Getter signStrategy', () => expect(CertificateService.signStrategy).toBeInstanceOf(SignStrategy));
});

describe('Check active/inactive', () => {
  CertificateService.getCertificatesStrategy = new MockCryptoProGetCertificatesStrategy(certs_mock);
  CertificateService.diffCertificatesStrategy = new MockDiffCertificatesStrategy(diff_mock_certs_only_last_inactive);
  test('Last cert is inactive ', () => {
    expect.assertions(21);
    return CertificateService.getLoginCertificates()
      .then((certs) => {
        expect(certs[0].isActive).toBe(true);
        expect(certs[0].thumbprint).toBe('08E52A95D0CA1FD999CD6B638A75E815F67BB300');
        expect(certs[0].subject.CN).toBe('ООО ""Поставщик Товаров и Услуг""');

        expect(certs[1].isActive).toBe(true);
        expect(certs[1].thumbprint).toBe('2EE15735399431F18E3C16EFC1FF6902F4C15D3E');
        expect(certs[1].subject.CN).toBe('ООО ""Фронт-Енд Тест""');

        expect(certs[2].isActive).toBe(true);
        expect(certs[2].thumbprint).toBe('13AE0B15DA52ECE1037FA131065EA6322197D7FF');
        expect(certs[2].subject.CN).toBe('ООО ТРИЗ');

        expect(certs[3].isActive).toBe(true);
        expect(certs[3].thumbprint).toBe('A6E25FAD8EC9BAD3BFA16D57E369CD6F70F82C92');
        expect(certs[3].subject.CN).toBe('ООО БалтАвиа');

        expect(certs[4].isActive).toBe(true);
        expect(certs[4].thumbprint).toBe('14EFF25B12FA9E1E91EA4745A5762EA8CEBB7E6D');
        expect(certs[4].subject.CN).toBe('ООО ПитСервис');

        expect(certs[5].isActive).toBe(true);
        expect(certs[5].thumbprint).toBe('140AD23AC0EA11127973882DE4C77ED92A4F9DB9');
        expect(certs[5].subject.CN).toBe('ИП Малышев');

        expect(certs[6].isActive).toBe(true);
        expect(certs[6].thumbprint).toBe('A5EDA5A21A08CE846985E477ED29C74E75B9D1BB');
        expect(certs[6].subject.CN).toBe('Varno Kate');

        // ГарантПродукт отсутствует в списке!
      });
  });
});
