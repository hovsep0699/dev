import TotalAmountOfTax from './TotalAmountOfTax';

describe('calculate', () => {
  test('1, 2', () => {
    expect(TotalAmountOfTax.calculate(1, 2)).toBe(3);
  });
  test('10.5, 10.5', () => {
    expect(TotalAmountOfTax.calculate(10.5, 10.5)).toBe(21);
  });
  test('0.005, 0.005', () => {
    expect(TotalAmountOfTax.calculate(0.005, 0.005)).toBe(0);
  });
  test('0.0005, 0.0005', () => {
    expect(TotalAmountOfTax.calculate(0.0005, 0.0005)).toBe(0);
  });
  test('0.016', () => {
    expect(TotalAmountOfTax.calculate(0.013, 0.003)).toBe(0.01);
  });
  test('0.01999', () => {
    expect(TotalAmountOfTax.calculate(0.01999, 0)).toBe(0.01);
  });
  test('check MAX_SAFE_INTEGERs sum', () => {
    expect(TotalAmountOfTax.calculate(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(4 * Number.MAX_SAFE_INTEGER);
  });
  test('check MAX_SAFE_INTEGERs with mantisa .01 sum', () => {
    expect(TotalAmountOfTax.calculate(Number.MAX_SAFE_INTEGER + 0.01, Number.MAX_SAFE_INTEGER + 0.01, Number.MAX_SAFE_INTEGER + 0.01, Number.MAX_SAFE_INTEGER + 0.01)).toBe(4 * (Number.MAX_SAFE_INTEGER + 0.01));
  });
  test('empty', () => {
    expect(TotalAmountOfTax.calculate()).toBe(0);
  });
  test('Max safe integer, 1', () => {
    expect(TotalAmountOfTax.calculate(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
  });
  test('Pass number but String', () => {
    expect(TotalAmountOfTax.calculate('0.01999', '0')).toBe(0.01);
  });
  test('number + string', () => {
    expect(TotalAmountOfTax.calculate(0.01999, '0')).toBe(0.01);
  });
  test('NaN + number + number', () => {
    expect(TotalAmountOfTax.calculate('i am not a number', '0', 100.50)).toBe(100.5);
  });
  test('String(10.50) + String(10.50)', () => {
    expect(TotalAmountOfTax.calculate('10.50', '10.50')).toBe(21);
  });
});

describe('bad TotalAmountOfTax', () => {
  test('Pass not number', () => {
    expect(new TotalAmountOfTax('i am not number. Sorry').value).toBe('');
  });
});

describe('good TotalAmountOfTax', () => {
  test('Number(100)', () => {
    expect(new TotalAmountOfTax(100).value).toBe('100');
  });
  test('Number(100.005)', () => {
    expect(new TotalAmountOfTax(100.005).value).toBe('100');
  });
  test('Number(100.05)', () => {
    expect(new TotalAmountOfTax(100.05).value).toBe('100.05');
  });
  test('Number(100.059999)', () => {
    expect(new TotalAmountOfTax(100.059999).value).toBe('100.05');
  });
  test('String(100)', () => {
    expect(new TotalAmountOfTax('100').value).toBe('100');
  });
  test('String(100.005)', () => {
    expect(new TotalAmountOfTax('100.005').value).toBe('100');
  });
  test('String(100.05)', () => {
    expect(new TotalAmountOfTax('100.05').value).toBe('100.05');
  });
  test('String(100.059999)', () => {
    expect(new TotalAmountOfTax('100.059999').value).toBe('100.05');
  });
});
