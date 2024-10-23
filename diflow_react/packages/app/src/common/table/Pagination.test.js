import Pagination from './Pagination';

describe('calcNewCurrentPage', () => {
  test('4, 20, 50', () => expect(Pagination.prototype.calcNewCurrentPage(4, 20, 50)).toBe(2));
  test('4, 20, 10', () => expect(Pagination.prototype.calcNewCurrentPage(4, 20, 10)).toBe(7));
  test('3, 10, 50', () => expect(Pagination.prototype.calcNewCurrentPage(3, 10, 50)).toBe(1));
  test('5, 50, 10', () => expect(Pagination.prototype.calcNewCurrentPage(5, 50, 10)).toBe(21));
  test('1, 50, 20', () => expect(Pagination.prototype.calcNewCurrentPage(1, 50, 20)).toBe(1));
  test('1, 10, 50', () => expect(Pagination.prototype.calcNewCurrentPage(1, 10, 50)).toBe(1));
  test('"2", "50", "20"', () =>
    expect(Pagination.prototype.calcNewCurrentPage('2', '50', '20')).toBe(3));
  test('30, 30, 30', () => expect(Pagination.prototype.calcNewCurrentPage(30, 30, 30)).toBe(30));
  test('1, 30, 30', () => expect(Pagination.prototype.calcNewCurrentPage(1, 30, 30)).toBe(1));
  test('31, 30, 30', () => expect(Pagination.prototype.calcNewCurrentPage(31, 30, 30)).toBe(31));
  test('29, 30, 30', () => expect(Pagination.prototype.calcNewCurrentPage(29, 30, 30)).toBe(29));
  test('30, 10, 20', () => expect(Pagination.prototype.calcNewCurrentPage(30, 10, 20)).toBe(15));
});

describe('calcNewCurrentPage wrong parameters', () => {
  it('0, 20, 50', () =>
    expect(() => Pagination.prototype.calcNewCurrentPage(0, 20, 50)).toThrow(
      'Номер текущей страницы должен быть больше нуля'
    ));
  it('5, -20, 10', () =>
    expect(() => Pagination.prototype.calcNewCurrentPage(5, -20, 10)).toThrow(
      'Текущее количество элементов на странице должно быть больше нуля'
    ));
  it('3, 10, 0', () =>
    expect(() => Pagination.prototype.calcNewCurrentPage(3, 10, 0)).toThrow(
      'Желаемое количество элементов на странице должно быть больше нуля'
    ));
  it('3, 10, -1', () =>
    expect(() => Pagination.prototype.calcNewCurrentPage(3, 10, -1)).toThrow(
      'Желаемое количество элементов на странице должно быть больше нуля'
    ));
});

describe('calcTotalPages', () => {
  test('52, 10', () => expect(Pagination.prototype.calcTotalPages(52, 10)).toBe(6));
  test('10, 10', () => expect(Pagination.prototype.calcTotalPages(10, 10)).toBe(1));
  test('3, 10', () => expect(Pagination.prototype.calcTotalPages(3, 10)).toBe(1));
  test('52, 20', () => expect(Pagination.prototype.calcTotalPages(52, 20)).toBe(3));
  test('10, 20', () => expect(Pagination.prototype.calcTotalPages(10, 20)).toBe(1));
  test('2, 20', () => expect(Pagination.prototype.calcTotalPages(40, 20)).toBe(2));
});

describe('calcTotalPages wrong parameters', () => {
  it('52, 0', () => {
    expect(() => Pagination.prototype.calcTotalPages(52, 0)).toThrow(
      'Значение limit должно быть больше нуля'
    );
  });
});
