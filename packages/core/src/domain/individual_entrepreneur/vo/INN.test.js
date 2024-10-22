import INN from './INN';

describe('ИП ИНН передача невалидных значений', () => {
  test('123', () => { expect(new INN('123').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('123 number', () => { expect(new INN(123).error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('123456789A', () => { expect(new INN('123456789A').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('length 9 not digit', () => { expect(new INN('AAAAAAAAA').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(new INN('123456789 ').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
  test('with whitespaces', () => { expect(new INN('   123456789     ').error.message).toBe('Невозможно создать ИНН. Формат не верен.'); });
});

describe('ИП ИНН передача валидных значений', () => {
  test('ИНН ИП Рожин', () => {
    const inn = new INN('143519566176');
    expect(inn.value === '143519566176').toBe(true);
  });
});

describe('ИП ИНН validate function', () => {
  test('good inn validate', () => expect(INN.validate('143519566176')).toBe(undefined));
  test('inn more then 12 digits validate', () => expect(INN.validate('14351956617666')).toBe('Введите номер длиной 12 знаков'));
  test('bad control number validate', () => expect(INN.validate('143519566179')).toBe('Неправильное контрольное число'));
  test('good inn isValid', () => expect(INN.isValid('143519566176')).toBe(true));
  test('bad control number isValid', () => expect(INN.isValid('143519566171')).toBe(false));
  test('inn more then 12 digits isValid', () => expect(INN.isValid('14351956617666')).toBe(false));
});

describe('ИП ИНН mask', () => {
  test('7810  9994 25', () => {
    expect(INN.mask(' 143519566176')).toBe('143519566176');
  });
  test('   1435 195661 76', () => {
    expect(INN.mask('   1435 195661 76')).toBe('143519566176');
  });
  test('abcd  288', () => {
    expect(INN.mask('abcd  288')).toBe('288');
  });
  test('143519566176666', () => {
    expect(INN.mask('143519566176666')).toBe('143519566176');
  });
});
