import LegalAddress from './LegalAddress';
import Region from './address/Region';
import PostIndex from './address/PostIndex';

describe('Pass wrong parameters', () => {
  test('no arguments', () => {
    expect(() => new LegalAddress()).toThrowError('Невозможно создать юридический адрес компании. Нет обязательных полей(Почтовый индекс, Регион)');
  });
  test('only post index', () => {
    expect(() => new LegalAddress({ postalCode: new PostIndex('197343') })).toThrowError('Невозможно создать юридический адрес компании. Нет обязательного поля (Регион)');
  });
  test('only region', () => {
    const region = new Region('78', 'Г.Санкт-Петербург');
    expect(() => new LegalAddress({ region })).toThrowError('Невозможно создать юридический адрес компании. Нет обязательного поля (Почтовый индекс)');
  });
  test('wrong type for postIndex(must be VO)', () => {
    const region = new Region('01', 'Республика Адыгея (Адыгея)');
    expect(() => new LegalAddress({ postalCode: '197343', region })).toThrowError('Почтовый индекс должен быть экземпляром класса PostIndex');
  });
  test('wrong type for region(must be VO)', () => {
    expect(() => new LegalAddress({ postalCode: new PostIndex('197343'), region: 'название региона' })).toThrowError('Регион должен быть экземпляром класса Region');
  });
});
