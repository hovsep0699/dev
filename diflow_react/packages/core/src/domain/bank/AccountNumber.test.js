import AccountNumber from './AccountNumber';

describe('ЮЛ «Номер расчётного счёта» передача невалидных значений', () => {
  test('123', () => { expect(() => new AccountNumber('123')).toThrowError('Невозможно создать «Номер расчётного счёта». Формат не верен.'); });
  test('123 number', () => { expect(() => new AccountNumber(123)).toThrowError('Невозможно создать «Номер расчётного счёта». Формат не верен.'); });
  test('123456789A', () => { expect(() => new AccountNumber('123456789A')).toThrowError('Невозможно создать «Номер расчётного счёта». Формат не верен.'); });
  test('not digit', () => { expect(() => new AccountNumber('AAAAAAAAA')).toThrowError('Невозможно создать «Номер расчётного счёта». Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(() => new AccountNumber('123456789 ')).toThrowError('Невозможно создать «Номер расчётного счёта». Формат не верен.'); });
  test('with whitespaces', () => { expect(() => new AccountNumber('   123456789     ')).toThrowError('Невозможно создать «Номер расчётного счёта». Формат не верен.'); });
});

describe('ЮЛ «Номер расчётного счёта» передача валидных значений', () => {
  test('«Номер расчётного счёта» ООО "АБРАДОКС"', () => {
    const accountNumber = new AccountNumber('40702810638050013199');
    expect(accountNumber.value === '40702810638050013199').toBe(true);
  });
});

describe('ЮЛ «Номер расчётного счёта» validate function', () => {
  test('good accountNumber validate', () => expect(AccountNumber.validate('40702810638050013199')).toBe(undefined));
  test('accountNumber more then 20 digits validate', () => expect(AccountNumber.validate('40702810638050013199666')).toBe('Введите число длиной 20 знаков'));
  test('good accountNumber isValid', () => expect(AccountNumber.isValid('40702810638050013199')).toBe(true));
  test('accountNumber more then 20 digits isValid', () => expect(AccountNumber.isValid('40702810638050013199666')).toBe(false));
});

describe('ЮЛ Проверка расчётного счёта с помощью БИКа', () => {
  test('Правильный БИК validate', () => expect(AccountNumber.validateWithBIK('40702810638050013199', '044525225')).toBe(undefined));
  test('Несоответствующий БИК validate', () => expect(AccountNumber.validateWithBIK('40702810638050013199', '044525226')).toBe('Неправильное контрольное число'));
  test('Правильный БИК isValid', () => expect(AccountNumber.isValidWithBIK('40702810638050013199', '044525225')).toBe(true));
  test('Несоответствующий БИК isValid', () => expect(AccountNumber.isValidWithBIK('40702810638050013199', '044525226')).toBe(false));
});

describe('ЮЛ «Номер расчётного счёта» mask', () => {
  test('40702 81063805001 3199', () => {
    expect(AccountNumber.mask('40702 81063805001 3199')).toBe('40702810638050013199');
  });
  test('  407028 106380500 13199', () => {
    expect(AccountNumber.mask('  407028 106380500 13199')).toBe('40702810638050013199');
  });
  test('abcd  288', () => {
    expect(AccountNumber.mask('abcd  288')).toBe('288');
  });
  test('40702810638050013199666', () => {
    expect(AccountNumber.mask('40702810638050013199666')).toBe('40702810638050013199');
  });
});
