import DateType from './DateType';

describe('Дата передача невалидных значений', () => {
  test('1.09.2019', () => { expect(new DateType('1.09.2019').error.message).toBe('Невозможно создать дату. Формат не верен.'); });
  test('01/09/2019', () => { expect(new DateType('01/09/2019').error.message).toBe('Невозможно создать дату. Формат не верен.'); });
});

describe('Дата validate function', () => {
  test('good formatted date', () => expect(DateType.validate('01.09.2019')).toBe(undefined));
  test('bad formatted date date without leading zero', () => expect(DateType.validate('1.09.2019')).toBe('Введите дату в формате dd.mm.yyyy'));
  test('bad splitter date', () => expect(DateType.validate('02/09/2019')).toBe('Введите дату в формате dd.mm.yyyy'));
  test('pass timestamp', () => expect(DateType.validate(1569573757929)).toBe('Введите дату в формате dd.mm.yyyy'));
  test('pass null', () => expect(DateType.validate(null)).toBe('Введите дату в формате dd.mm.yyyy'));
  test('pass undefined', () => expect(DateType.validate(undefined)).toBe('Введите дату в формате dd.mm.yyyy'));
  test('bad month', () => expect(DateType.validate('01.13.2000')).toBe('Введите дату в формате dd.mm.yyyy'));
  test('bad day', () => expect(DateType.validate('32.01.2000')).toBe('Введите дату в формате dd.mm.yyyy'));
  test('bad day and month', () => expect(DateType.validate('99.99.2000')).toBe('Введите дату в формате dd.mm.yyyy'));
  test('too far future', () => expect(DateType.validate('01.01.10321')).toBe('Введите дату в формате dd.mm.yyyy'));
});

describe('Дата передача валидных значений', () => {
  test('01.09.2019', () => {
    const date = new DateType('01.09.2019');
    expect(date.value === '01.09.2019').toBe(true);
  });
  test('23.09.2019', () => {
    const date = new DateType('23.09.2019');
    expect(date.value === '23.09.2019').toBe(true);
  });
  test('23.09.9999', () => {
    const date = new DateType('23.09.9999');
    expect(date.value === '23.09.9999').toBe(true);
  });
});
