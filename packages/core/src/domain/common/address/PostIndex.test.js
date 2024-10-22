import PostIndex from './PostIndex';

describe('ЮЛ «Почтовый Индекс» передача невалидных значений', () => {
  test('123', () => { expect(() => new PostIndex('123')).toThrowError('Невозможно создать «Почтовый Индекс». Формат не верен.'); });
  test('123 number', () => { expect(() => new PostIndex(123)).toThrowError('Невозможно создать «Почтовый Индекс». Формат не верен.'); });
  test('123456789A', () => { expect(() => new PostIndex('123456789A')).toThrowError('Невозможно создать «Почтовый Индекс». Формат не верен.'); });
  test('length 9 not digit', () => { expect(() => new PostIndex('AAAAAAAAA')).toThrowError('Невозможно создать «Почтовый Индекс». Формат не верен.'); });
  test('with whitespaces at the end', () => { expect(() => new PostIndex('123456789 ')).toThrowError('Невозможно создать «Почтовый Индекс». Формат не верен.'); });
  test('with whitespaces', () => { expect(() => new PostIndex('   123456789     ')).toThrowError('Невозможно создать «Почтовый Индекс». Формат не верен.'); });
});

describe('«Почтовый Индекс» передача валидных значений', () => {
  test('«Почтовый Индекс» в СПб', () => {
    const postIndex = new PostIndex('197342');
    expect(postIndex.value === '197342').toBe(true);
  });
});

describe('«Почтовый Индекс» validate function', () => {
  test('good postIndex validate', () => expect(PostIndex.validate('197342')).toBe(undefined));
  test('postIndex more then 6 digits validate', () => expect(PostIndex.validate('197342666')).toBe('Введите индекс длиной 6 знаков'));
  test('good postIndex isValid', () => expect(PostIndex.isValid('197342')).toBe(true));
  test('postIndex more then 6 digits isValid', () => expect(PostIndex.isValid('197342666')).toBe(false));
});

describe('«Почтовый Индекс» mask', () => {
  test('197 342', () => {
    expect(PostIndex.mask('197 342')).toBe('197342');
  });
  test('  197 342', () => {
    expect(PostIndex.mask('  197 342')).toBe('197342');
  });
  test('abcd  197 342', () => {
    expect(PostIndex.mask('abcd  197 342')).toBe('197342');
  });
  test('197342666', () => {
    expect(PostIndex.mask('197342666')).toBe('197342');
  });
});
