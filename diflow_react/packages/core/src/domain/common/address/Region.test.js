import Region from './Region';

describe('Pass wrong parameters', () => {
  test('no arguments', () => {
    expect(() => new Region()).toThrowError('Невозможно создать регион. Передайте код и название региона.');
  });

  test('pass number', () => {
    expect(() => new Region(1, 'Республика Адыгея (Адыгея)')).toThrowError('Код региона должен быть строкой');
  });

  test('aa', () => {
    expect(() => new Region('aa', 'Республика Адыгея (Адыгея)')).toThrowError('Неверный формат кода региона');
  });

  test('1a', () => {
    expect(() => new Region('1a', 'Республика Адыгея (Адыгея)')).toThrowError('Неверный формат кода региона');
  });

  test('a1', () => {
    expect(() => new Region('a1', 'Республика Адыгея (Адыгея)')).toThrowError('Неверный формат кода региона');
  });

  test('two space', () => {
    expect(() => new Region('  ', 'Республика Адыгея (Адыгея)')).toThrowError('Неверный формат кода региона');
  });
});

describe('Good region', () => {
  test('01', () => {
    const region = new Region('01', 'Республика Адыгея (Адыгея)');
    expect(region.code).toBe('01');
    expect(region.title).toBe('Республика Адыгея (Адыгея)');
  });

  test('799', () => {
    const region = new Region('799', 'Москва');
    expect(region.code).toBe('799');
    expect(region.title).toBe('Москва');
  });
});


describe('Test mask', () => {
  test('Very long text mask 50 chars', () => {
    expect(Region.mask('123456789_123456789_123456789_123456789_123456789_after_50_char_str')).toBe('123456789_123456789_123456789_123456789_123456789_');
  });
  test('with spaces', () => {
    expect(Region.mask('  78 регион  ')).toBe('78 регион  ');
  });
  test('only spaces', () => {
    expect(Region.mask('    ')).toBe('');
  });
});
