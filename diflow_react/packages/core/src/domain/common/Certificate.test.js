import Certificate from './Certificate';
import mockCerts from '../../mocks/certs/crypto_pro_certs';

describe('Domain cert', () => {
  const cert = new Certificate(
    mockCerts[0].Subject,
    mockCerts[0].Thumbprint,
    mockCerts[0].ValidFromDate,
    mockCerts[0].ValidToDate,
    mockCerts[0].SerialNumber,
  );

  test('getter subject', () => expect(cert.subject).toMatchObject({
    SN: expect.any(String), // 'Второв',
    G: expect.any(String), // 'Иван Петрович',
    T: expect.any(String), // 'заместитель руководителя отдела логистики',
    STREET: expect.any(String), // 'ул. Тверская, 22',
    CN: expect.any(String), // 'ООО ""Поставщик Товаров и Услуг""',
    OU: expect.any(String), // '0',
    O: expect.any(String), // 'ООО ""Поставщик Товаров и Услуг""',
    L: expect.any(String), // 'Москва',
    S: expect.any(String), // '77 Москва',
    C: expect.any(String), // 'RU',
    E: expect.any(String), // 'goods_for_you@distate.ru',
    INN: expect.any(String), // '009987109032',
    OGRN: expect.any(String), // '1127747209032',
    SNILS: expect.any(String), // '08836009032',
  }));

  test('getter thumbprint', () => expect(cert.thumbprint).toBe('08E52A95D0CA1FD999CD6B638A75E815F67BB300'));
  test('getter validFrom', () => expect(cert.validFrom).toBe('2018-09-03T08:26:00.000Z'));
  test('getter validTo', () => expect(cert.validTo).toBe('2019-12-03T08:36:00.000Z'));
  test('getter serialNumber', () => expect(cert.serialNumber).toBe('61118CFB000300000187'));
});

describe('Test time for cert', () => {
  const cert = new Certificate(
    mockCerts[0].Subject,
    mockCerts[0].Thumbprint,
    mockCerts[0].ValidFromDate,
    '2019-12-03T08:33:00.000Z',
    mockCerts[0].SerialNumber,
  );
  test('cert date is in the past 1 day (not valid now)', () => {
    Date.now = () => new Date('2019-12-04T08:33:00.000Z').getTime();
    expect(cert.isOutdated).toBe(true);
  });
  test('cert date is in the past 1 microsecond (not valid now)', () => {
    Date.now = () => new Date('2019-12-03T08:33:00.001Z').getTime();
    expect(cert.isOutdated).toBe(true);
  });
  test('cert date is in the future 1 microsecond (valid now)', () => {
    Date.now = () => new Date('2019-12-03T08:32:59.999Z').getTime();
    expect(cert.isOutdated).toBe(false);
  });
  test('cert date equal now(valid now)', () => {
    Date.now = () => new Date('2019-12-03T08:33:00.000Z').getTime();
    expect(cert.isOutdated).toBe(false);
  });
});
