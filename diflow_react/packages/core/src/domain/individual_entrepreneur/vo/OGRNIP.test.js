import OGRNIP from './OGRNIP';

describe('ОГРНИП передача невалидных значений', () => {
  test('123', () => { expect(new OGRNIP('123').error.message).toBe('Невозможно создать ОГРНИП. Формат не верен.'); });
  test('123 number', () => { expect(new OGRNIP(123).error.message).toBe('Невозможно создать ОГРНИП. Формат не верен.'); });
  test('123456789A', () => { expect(new OGRNIP('123456789A').error.message).toBe('Невозможно создать ОГРНИП. Формат не верен.'); });
  test('length 9 not digit', () => { expect(new OGRNIP('AAAAAAAAA').error.message).toBe('Невозможно создать ОГРНИП. Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(new OGRNIP('123456789 ').error.message).toBe('Невозможно создать ОГРНИП. Формат не верен.'); });
  test('with whitespaces', () => { expect(new OGRNIP('   123456789     ').error.message).toBe('Невозможно создать ОГРНИП. Формат не верен.'); });
});

describe('ОГРНИП передача валидных значений', () => {
  test('ОГРНИП ИП Рожин', () => {
    const ogrn = new OGRNIP('319144700001801');
    expect(ogrn.value === '319144700001801').toBe(true);
  });
});

describe('ОГРНИП validate function', () => {
  test('good ogrn validate', () => expect(OGRNIP.validate('319144700001801')).toBe(undefined));
  test('ogrn more then 15 digits validate', () => expect(OGRNIP.validate('319144700001801666')).toBe('Введите номер длиной 15 знаков'));
  test('wrong control number validate', () => expect(OGRNIP.validate('319144700001802')).toBe('Неправильное контрольное число'));
  test('good ogrn isValid', () => expect(OGRNIP.isValid('319144700001801')).toBe(true));
  test('ogrn more then 15 digits isValid', () => expect(OGRNIP.isValid('319144700001801666')).toBe(false));
  test('wrong control number isValid', () => expect(OGRNIP.isValid('319144700001802')).toBe(false));
});

describe('ОГРНИП mask', () => {
  test('3191447 00001801', () => {
    expect(OGRNIP.mask('3191447 00001801')).toBe('319144700001801');
  });
  test('  3191447 00001801 ', () => {
    expect(OGRNIP.mask('  3191447 00001801 ')).toBe('319144700001801');
  });
  test('abcd  288', () => {
    expect(OGRNIP.mask('abcd  288')).toBe('288');
  });
  test('1147847244270666', () => {
    expect(OGRNIP.mask('319144700001801666')).toBe('319144700001801');
  });
});
