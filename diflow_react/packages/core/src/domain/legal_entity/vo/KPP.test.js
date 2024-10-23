import KPP from './KPP';

describe('KPP передача невалидных значений', () => {
  test('123', () => { expect(() => new KPP('123')).toThrowError('Невозможно создать КПП. Формат не верен.'); });
  test('123 number', () => { expect(() => new KPP(123)).toThrowError('Невозможно создать КПП. Формат не верен.'); });
  test('123456789A', () => { expect(() => new KPP('123456789A')).toThrowError('Невозможно создать КПП. Формат не верен.'); });
  test('length 9 not digit', () => { expect(() => new KPP('AAAAAAAAA')).toThrowError('Невозможно создать КПП. Формат не верен.'); });
  test('length 10 digit str', () => { expect(() => new KPP('1234567891')).toThrowError('Невозможно создать КПП. Формат не верен.'); });
  test('length 10 digit number', () => { expect(() => new KPP(1234567891)).toThrowError('Невозможно создать КПП. Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(() => new KPP('123456789 ')).toThrowError('Невозможно создать КПП. Формат не верен.'); });
  test('with whitespaces', () => { expect(() => new KPP('   123456789     ')).toThrowError('Невозможно создать КПП. Формат не верен.'); });
});

describe('KPP передача валидных значений', () => {
  test('7801_50_001', () => {
    const kpp = new KPP(780150001);
    expect(kpp.value === '780150001').toBe(true);
    expect(kpp.value === 780150001).toBe(false);
    expect(kpp.codeTaxAuthority === '7801').toBe(true);
    expect(kpp.registrationReason === '50').toBe(true);
    expect(kpp.registrationNumber === '001').toBe(true);
  });
  test('validate function', () => {
    expect(KPP.validate(780150001)).toBe(undefined);
    expect(KPP.validate('780150001')).toBe(undefined);
    expect(KPP.validate(7801500015)).toBe('Введите код длиной 9 знаков');
    expect(KPP.validate('7801500015')).toBe('Введите код длиной 9 знаков');

    expect(KPP.isValid(780150001)).toBe(true);
    expect(KPP.isValid('780150001')).toBe(true);
    expect(KPP.isValid(7801500015)).toBe(false);
    expect(KPP.isValid('7801500015')).toBe(false);
  });
});

describe('KPP mask', () => {
  test('7801 50 001', () => {
    expect(KPP.mask('7801 50 001')).toBe('780150001');
  });
  test('  7801       50 001', () => {
    expect(KPP.mask('7801 50 001')).toBe('780150001');
  });
  test('abcd  7801', () => {
    expect(KPP.mask('abcd  7801')).toBe('7801');
  });
  test('abcdefghij  7801', () => {
    expect(KPP.mask('abcdefghij  7801')).toBe('7801');
  });
  test('780150001666', () => {
    expect(KPP.mask('780150001666')).toBe('780150001');
  });
});
