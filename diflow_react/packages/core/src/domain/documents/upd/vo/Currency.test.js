import Currency from './Currency';

describe('Code valid', () => {
  test('string: 643', () => {
    expect(new Currency({
      digital_code: '643',
      title: 'Российский рубль',
      letter_code: 'RUS',
      id: 147
    }).code.value).toBe('643');
  });
  test('number: 643', () => {
    expect(new Currency({
      digital_code: 643,
      title: 'Российский рубль',
      letter_code: 'RUS',
      id: 147
    }).code.value).toBe('643');
  });
});
describe('Code not valid', () => {
  test('more than 3 digits: 6435', () => {
    expect(new Currency({
      digital_code: '6435',
      title: 'Российский рубль',
      letter_code: 'RUS',
      id: 147
    }).code.error.message).toBe('Невозможно создать цифровой код валюты. Формат не верен.');
  });
  test('less than 3 digits: 64', () => {
    expect(new Currency({
      digital_code: '64',
      title: 'Российский рубль',
      letter_code: 'RUS',
      id: 147
    }).code.error.message).toBe('Невозможно создать цифровой код валюты. Формат не верен.');
  });
  test('not digits: abc', () => {
    expect(new Currency({
      digital_code: 'abc',
      title: 'Российский рубль',
      letter_code: 'RUS',
      id: 147
    }).code.error.message).toBe('Невозможно создать цифровой код валюты. Формат не верен.');
  });
  test('empty string', () => {
    expect(new Currency({
      digital_code: '',
      title: 'Российский рубль',
      letter_code: 'RUS',
      id: 147
    }).code.error.message).toBe('Невозможно создать цифровой код валюты. Формат не верен.');
  });
});
describe('LetterCode valid', () => {
  test('RUS', () => {
    expect(new Currency({
      digital_code: '643',
      title: 'Российский рубль',
      letter_code: 'RUS',
      id: 147
    }).letterCode.value).toBe('RUS');
  });
});
describe('LetterCode not valid', () => {
  test('more than 3 chars: RUSS', () => {
    expect(new Currency({
      digital_code: '643',
      title: 'Российский рубль',
      letter_code: 'RUSS',
      id: 147
    }).letterCode.error.message).toBe('Невозможно создать алфавитный код валюты. Формат не верен.');
  });
  test('less than 3 chars: RU', () => {
    expect(new Currency({
      digital_code: '643',
      title: 'Российский рубль',
      letter_code: 'RU',
      id: 147
    }).letterCode.error.message).toBe('Невозможно создать алфавитный код валюты. Формат не верен.');
  });
  test('digits: 643', () => {
    expect(new Currency({
      digital_code: '643',
      title: 'Российский рубль',
      letter_code: 'RU',
      id: 147
    }).letterCode.error.message).toBe('Невозможно создать алфавитный код валюты. Формат не верен.');
  });
  test('empty string', () => {
    expect(new Currency({
      digital_code: '643',
      title: 'Российский рубль',
      letter_code: '',
      id: 147
    }).letterCode.error.message).toBe('Невозможно создать алфавитный код валюты. Формат не верен.');
  });
});
