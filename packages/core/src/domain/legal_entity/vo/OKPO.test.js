import OKPO from './OKPO';

describe('ЮЛ OKПO передача невалидных значений', () => {
  test('123', () => { expect(new OKPO('123').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('123 number', () => { expect(new OKPO(123).error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('123456789A', () => { expect(new OKPO('123456789A').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('length 9 not digit', () => { expect(new OKPO('AAAAAAAAA').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(new OKPO('123456789 ').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('with whitespaces', () => { expect(new OKPO('   123456789     ').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
});

describe('ЮЛ OKПO передача валидных значений', () => {
  test('ОКПО Дистэйт-а', () => {
    const okpo = new OKPO(28891383);
    expect(okpo.value === '28891383').toBe(true);
    expect(okpo.value === 28891383).toBe(false);
  });
  test('validate function', () => {
    expect(OKPO.validate(28891383)).toBe(undefined);
    expect(OKPO.validate('28891383')).toBe(undefined);
    expect(OKPO.validate(288913836)).toBe('Введите число длиной 8 знаков');
    expect(OKPO.validate('288913836')).toBe('Введите число длиной 8 знаков');

    expect(OKPO.isValid(28891383)).toBe(true);
    expect(OKPO.isValid('28891383')).toBe(true);
    expect(OKPO.isValid(288913836)).toBe(false);
    expect(OKPO.isValid('288913836')).toBe(false);
  });
});

describe('ЮЛ OKПO mask', () => {
  test('288 913 83', () => {
    expect(OKPO.mask('288 913 83')).toBe('28891383');
  });
  test('  288 913 83', () => {
    expect(OKPO.mask('  288 913 83')).toBe('28891383');
  });
  test('abcd  288', () => {
    expect(OKPO.mask('abcd  288')).toBe('288');
  });
  test('288913836666', () => {
    expect(OKPO.mask('288913836666')).toBe('28891383');
  });
});
