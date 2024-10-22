import INN from './INN';

describe('ЮЛ ИНН передача невалидных значений', () => {
  test('123', () => { expect(new INN('123').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('123 number', () => { expect(new INN(123).error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('123456789A', () => { expect(new INN('123456789A').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('length 9 not digit', () => { expect(new INN('AAAAAAAAA').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(new INN('123456789 ').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('with whitespaces', () => { expect(new INN('   123456789     ').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
});

describe('ЮЛ ИНН передача валидных значений', () => {
  test('ИНН Дистэйт', () => {
    const inn = new INN('7810999425');
    expect(inn.value === '7810999425').toBe(true);
  });
});

describe('ЮЛ ИНН validate function', () => {
  test('good inn validate', () => expect(INN.validate('7810999425')).toBe(undefined));
  test('inn more then 9 digits validate', () => expect(INN.validate('7810999425666')).toBe('Введите номер длиной 10 знаков'));
  test('bad control number validate', () => expect(INN.validate('7810999426')).toBe('Неправильное контрольное число'));
  test('good inn isValid', () => expect(INN.isValid('7810999425')).toBe(true));
  test('bad control number isValid', () => expect(INN.isValid('7810999426')).toBe(false));
  test('inn more then 9 digits isValid', () => expect(INN.isValid('7810999425666')).toBe(false));
  test('good string length but not validate because wrong control number', () => expect(INN.isValid('7804284123')).toBe(false));
});

describe('ЮЛ ИНН mask', () => {
  test('7810  9994 25', () => {
    expect(INN.mask('7810  9994 25')).toBe('7810999425');
  });
  test('  78109 99425', () => {
    expect(INN.mask('  78109 99425')).toBe('7810999425');
  });
  test('abcd  288', () => {
    expect(INN.mask('abcd  288')).toBe('288');
  });
  test('7810999425666', () => {
    expect(INN.mask('7810999425666')).toBe('7810999425');
  });
});
