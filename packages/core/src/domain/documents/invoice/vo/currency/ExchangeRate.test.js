import ExchangeRate from './ExchangeRate';

describe('Valid', () => {
  test('65.2', () => { expect(new ExchangeRate('65.2').value).toBe('65.2'); });
  test('65.1234', () => { expect(new ExchangeRate('65.1234').value).toBe('65.1234'); });
  test('string: 65', () => { expect(new ExchangeRate('65').value).toBe('65'); });
  test('number: 65', () => { expect(new ExchangeRate(65).value).toBe('65'); });
});
describe('Not valid', () => {
  test('abc', () => { expect(() => new ExchangeRate('abc')).toThrowError('Невозможно создать курс валюты. Формат не верен.'); });
  test('more than 4 digits after dot 65.12345', () => { expect(() => new ExchangeRate('65.12345')).toThrowError('Невозможно создать курс валюты. Формат не верен.'); });
  test('65,12', () => { expect(() => new ExchangeRate('65,12')).toThrowError('Невозможно создать курс валюты. Формат не верен.'); });
  test('-65', () => { expect(() => new ExchangeRate('-65')).toThrowError('Невозможно создать курс валюты. Формат не верен.'); });
});
describe('Mask', () => {
  test('string: 65', () => { expect(ExchangeRate.mask('65')).toBe('65'); });
  test('number: 65', () => { expect(ExchangeRate.mask(65)).toBe('65'); });
  test('-65', () => { expect(ExchangeRate.mask('-65')).toBe('65'); });
  test('65,1', () => { expect(ExchangeRate.mask('65,1')).toBe('65,1'); });
  test('65.12345', () => { expect(ExchangeRate.mask('65.12345')).toBe('65.12345'); });
  test('0.11', () => { expect(ExchangeRate.mask('0.11')).toBe('0.11'); });
  test('00.11', () => { expect(ExchangeRate.mask('00.11')).toBe('00.11'); });
  test('0.1100', () => { expect(ExchangeRate.mask('0.1100')).toBe('0.1100'); });
  test('0..77', () => { expect(ExchangeRate.mask('0..77')).toBe('0.77'); });
  test('0,,,77', () => { expect(ExchangeRate.mask('0,,,77')).toBe('0,77'); });
  test('0,7,7,', () => { expect(ExchangeRate.mask('0,7,7,')).toBe('0,77'); });
  test('.25', () => { expect(ExchangeRate.mask('.25')).toBe('.25'); });
  test('abc', () => { expect(ExchangeRate.mask('abc')).toBe(''); });
  test('empty string', () => { expect(ExchangeRate.mask('')).toBe(false); });
  test('0', () => { expect(ExchangeRate.mask(0)).toBe('0'); });
  test('undefined', () => { expect(ExchangeRate.mask(undefined)).toBe(false); });
});

describe('MaskOnBlur', () => {
  test('65', () => { expect(ExchangeRate.maskOnBlur('65')).toBe('65'); });
  test('-65', () => { expect(ExchangeRate.maskOnBlur('-65')).toBe('65'); });
  test('string: 65.12', () => { expect(ExchangeRate.maskOnBlur('65.12')).toBe('65.12'); });
  test('number: 65.12', () => { expect(ExchangeRate.maskOnBlur(65.12)).toBe('65.12'); });
  test('65.12349', () => { expect(ExchangeRate.maskOnBlur('65.12349')).toBe('65.1235'); });
  test('65.12345', () => { expect(ExchangeRate.maskOnBlur('65.12345')).toBe('65.1235'); });
  test('65.12341', () => { expect(ExchangeRate.maskOnBlur('65.12341')).toBe('65.1234'); });
  test('65,1234', () => { expect(ExchangeRate.maskOnBlur('65,1234')).toBe('65.1234'); });
  test('0.11', () => { expect(ExchangeRate.maskOnBlur('0.11')).toBe('0.11'); });
  test('00.11', () => { expect(ExchangeRate.maskOnBlur('00.11')).toBe('0.11'); });
  test('0.1100', () => { expect(ExchangeRate.maskOnBlur('0.1100')).toBe('0.11'); });
  test('0..77', () => { expect(ExchangeRate.maskOnBlur('0..77')).toBe('0.77'); });
  test('0,,,77', () => { expect(ExchangeRate.maskOnBlur('0,,,77')).toBe('0.77'); });
  test('0,7,7,', () => { expect(ExchangeRate.maskOnBlur('0,7,7,')).toBe('0.77'); });
  test('.25', () => { expect(ExchangeRate.maskOnBlur('.25')).toBe('0.25'); });
  test('abc', () => { expect(ExchangeRate.maskOnBlur('abc')).toBe(false); });
  test('empty string', () => { expect(ExchangeRate.maskOnBlur('')).toBe(false); });
  test('0', () => { expect(ExchangeRate.maskOnBlur(0)).toBe(false); });
  test('...', () => { expect(ExchangeRate.maskOnBlur('...')).toBe(false); });
  test('undefined', () => { expect(ExchangeRate.maskOnBlur(undefined)).toBe(false); });
});
