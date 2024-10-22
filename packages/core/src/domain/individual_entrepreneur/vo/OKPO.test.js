import OKPO from './OKPO';

describe('ИП OKПO передача невалидных значений', () => {
  test('123', () => { expect(new OKPO('123').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('123 number', () => { expect(new OKPO(123).error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('123456789A', () => { expect(new OKPO('123456789A').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('length 9 not digit', () => { expect(new OKPO('AAAAAAAAA').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(new OKPO('123456789 ').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
  test('with whitespaces', () => { expect(new OKPO('   123456789     ').error.message).toBe('Невозможно создать ОКПО. Формат не верен.'); });
});

describe('ИП OKПO передача валидных значений', () => {
  test('ОКПО Рожин', () => {
    const okpo = new OKPO('0163173060');
    expect(okpo.value === '0163173060').toBe(true);
  });
  test('validate function', () => {
    expect(OKPO.validate('0163173060')).toBe(undefined);
    expect(OKPO.validate('016317306')).toBe('Введите число длиной 10 знаков');

    expect(OKPO.isValid('0163173060')).toBe(true);
    expect(OKPO.isValid('016317306')).toBe(false);
  });
});

describe('ИП OKПO mask', () => {
  test('288 913 83', () => {
    expect(OKPO.mask('0163 173 060')).toBe('0163173060');
  });
  test('  288 913 83', () => {
    expect(OKPO.mask('  0163 173060')).toBe('0163173060');
  });
  test('abcd  288', () => {
    expect(OKPO.mask('abcd  0163173060')).toBe('0163173060');
  });
  test('288913836666', () => {
    expect(OKPO.mask('0163173060666')).toBe('0163173060');
  });
});
