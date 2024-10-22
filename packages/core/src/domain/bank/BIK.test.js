import BIK from './BIK';

describe('ЮЛ БИК передача невалидных значений', () => {
  test('123', () => { expect(() => new BIK('123')).toThrowError('Невозможно создать БИК. Формат не верен.'); });
  test('123 number', () => { expect(() => new BIK(123)).toThrowError('Невозможно создать БИК. Формат не верен.'); });
  test('123456789A', () => { expect(() => new BIK('123456789A')).toThrowError('Невозможно создать БИК. Формат не верен.'); });
  test('length 9 not digit', () => { expect(() => new BIK('AAAAAAAAA')).toThrowError('Невозможно создать БИК. Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(() => new BIK('123456789 ')).toThrowError('Невозможно создать БИК. Формат не верен.'); });
  test('with whitespaces', () => { expect(() => new BIK('   123456789     ')).toThrowError('Невозможно создать БИК. Формат не верен.'); });
});

describe('ЮЛ БИК передача валидных значений', () => {
  test('БИК БАНК ВТБ (ПАО) Пресненская наб, 12', () => {
    const bik = new BIK('044525187');
    expect(bik.value === '044525187').toBe(true);
  });
});

describe('ЮЛ БИК validate function', () => {
  test('good bik validate', () => expect(BIK.validate('044525187')).toBe(undefined));
  test('bik more then 9 digits validate', () => expect(BIK.validate('044525187666')).toBe('Введите число длиной 9 знаков'));
  test('bik start not from 04 validate', () => expect(BIK.validate('444525187')).toBe('Первые две цифры в БИК должны быть «04»(код РФ)'));
  test('good bik isValid', () => expect(BIK.isValid('044525187')).toBe(true));
  test('bik more then 9 digits isValid', () => expect(BIK.isValid('044525187666')).toBe(false));
  test('bik start not from 04 isValid', () => expect(BIK.isValid('554525187')).toBe(false));
});

describe('ЮЛ БИК mask', () => {
  test('0445 2518 7', () => {
    expect(BIK.mask('0445 2518 7')).toBe('044525187');
  });
  test('  0445 2518 7', () => {
    expect(BIK.mask('  0445 2518 7')).toBe('044525187');
  });
  test('abcd  288', () => {
    expect(BIK.mask('abcd  288')).toBe('288');
  });
  test('044525187666', () => {
    expect(BIK.mask('044525187666')).toBe('044525187');
  });
});
