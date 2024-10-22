import OGRN from './OGRN';

describe('ЮЛ ОГРН передача невалидных значений', () => {
  test('123', () => { expect(new OGRN('123').error.message).toBe('Невозможно создать ОГРН. Формат не верен.'); });
  test('123 number', () => { expect(new OGRN(123).error.message).toBe('Невозможно создать ОГРН. Формат не верен.'); });
  test('123456789A', () => { expect(new OGRN('123456789A').error.message).toBe('Невозможно создать ОГРН. Формат не верен.'); });
  test('length 9 not digit', () => { expect(new OGRN('AAAAAAAAA').error.message).toBe('Невозможно создать ОГРН. Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(new OGRN('123456789 ').error.message).toBe('Невозможно создать ОГРН. Формат не верен.'); });
  test('with whitespaces', () => { expect(new OGRN('   123456789     ').error.message).toBe('Невозможно создать ОГРН. Формат не верен.'); });
});

describe('ЮЛ ОГРН передача валидных значений', () => {
  test('ОГРН Дистэйт', () => {
    const ogrn = new OGRN('1147847244270');
    expect(ogrn.value === '1147847244270').toBe(true);
  });
});

describe('ЮЛ ОГРН validate function', () => {
  test('good ogrn validate', () => expect(OGRN.validate('1147847244270')).toBe(undefined));
  test('ogrn more then 13 digits validate', () => expect(OGRN.validate('1147847244270666')).toBe('Введите номер длиной 13 знаков'));
  test('wrong control number validate', () => expect(OGRN.validate('1147847244271')).toBe('Неправильное контрольное число'));
  test('good ogrn isValid', () => expect(OGRN.isValid('1147847244270')).toBe(true));
  test('ogrn more then 13 digits isValid', () => expect(OGRN.isValid('1147847244270666')).toBe(false));
  test('wrong control number isValid', () => expect(OGRN.isValid('1147847244271')).toBe(false));
});

describe('ЮЛ ОГРН mask', () => {
  test('114784 7244270', () => {
    expect(OGRN.mask('114784 7244270')).toBe('1147847244270');
  });
  test('  114784 7244270  ', () => {
    expect(OGRN.mask('  114784 7244270  ')).toBe('1147847244270');
  });
  test('abcd  288', () => {
    expect(OGRN.mask('abcd  288')).toBe('288');
  });
  test('1147847244270666', () => {
    expect(OGRN.mask('1147847244270666')).toBe('1147847244270');
  });
});
