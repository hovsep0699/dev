import AuthService from './AuthService';
import AuthRequest from './AuthRequest';
import RecoverRequest from './RecoverRequest';
import DiError from '../error/Error';
import DomainCertificate from '../../domain/common/Certificate';
import mockCerts from '../../mocks/certs/crypto_pro_certs';

describe('Test chain of responsibility wrong input parameter', () => {
  test('pass nothing', () => expect(() => AuthService.auth()).toThrowError('Следует передать запрос для авторизации'));
  test('null', () => expect(() => AuthService.auth(null)).toThrowError('Следует передать запрос для авторизации'));
  test('undefined', () => expect(() => AuthService.auth(undefined)).toThrowError('Следует передать запрос для авторизации'));
  test('0', () => expect(() => AuthService.auth(0)).toThrowError('Параметр должен быть подклассом AuthRequest'));
  test('false', () => expect(() => AuthService.auth(false)).toThrowError('Параметр должен быть подклассом AuthRequest'));
  test('empty string', () => expect(() => AuthService.auth('')).toThrowError('Параметр должен быть подклассом AuthRequest'));
  test('String', () => expect(() => AuthService.auth('Строка')).toThrowError('Параметр должен быть подклассом AuthRequest'));
  test('array', () => expect(() => AuthService.auth([])).toThrowError('Параметр должен быть подклассом AuthRequest'));
  test('function', () => expect(() => AuthService.auth(() => {})).toThrowError('Параметр должен быть подклассом AuthRequest'));
  test('Map', () => expect(() => AuthService.auth(new Map())).toThrowError('Параметр должен быть подклассом AuthRequest'));
  test('Set', () => expect(() => AuthService.auth(new Set())).toThrowError('Параметр должен быть подклассом AuthRequest'));
  test('AuthRequest without parameters', () => expect(() => AuthService.auth(new AuthRequest())).toThrowError('Запрос пустой'));
});

describe('Test email/password', () => {
  const requestEmailPassword = new AuthRequest();
  requestEmailPassword.email = 'email@gmail.com';
  requestEmailPassword.password = 'password';

  test('pass email, password', () => {
    expect.assertions(1);
    return AuthService.auth(requestEmailPassword).catch((error) => {
      expect(error).toBeInstanceOf(DiError);
    });
  });
});

describe('Test recover password', () => {
  const recoverRequest = new RecoverRequest();
  recoverRequest.email = 'email@gmail.com';
  recoverRequest.captcha = 'captcha';

  test('pass email, captcha', () => {
    expect.assertions(1);
    return AuthService.recover(recoverRequest).catch(error => expect(error).toBeInstanceOf(DiError));
  });
});


describe('Test auth via certificate', () => {
  const requestCertificate = new AuthRequest();
  requestCertificate.certificate = new DomainCertificate(
    mockCerts[0].Subject,
    mockCerts[0].Thumbprint,
    mockCerts[0].ValidFromDate,
    mockCerts[0].ValidToDate,
    mockCerts[0].SerialNumber,
  );

  test('pass thumbprint', () => expect(AuthService.auth(requestCertificate)).rejects.toBeInstanceOf(DiError));
});

describe('Test hasAuth', () => {
  test('hasAuth?', async () => {
    const company = await AuthService.hasAuth();
    expect(AuthService.isAuthed).toBe(false);
    expect(company).toBe(undefined);
  });
});
