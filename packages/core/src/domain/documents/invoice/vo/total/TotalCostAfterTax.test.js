import TotalCostAfterTax from './TotalCostAfterTax';

describe('calculate', () => {
  test('1, 2', () => {
    expect(TotalCostAfterTax.calculate(1, 2)).toBe(3);
  });
  test('10.5, 10.5', () => {
    expect(TotalCostAfterTax.calculate(10.5, 10.5)).toBe(21);
  });
  test('0.005, 0.005', () => {
    expect(TotalCostAfterTax.calculate(0.005, 0.005)).toBe(0);
  });
  test('0.0005, 0.0005', () => {
    expect(TotalCostAfterTax.calculate(0.0005, 0.0005)).toBe(0);
  });
  test('0.016', () => {
    expect(TotalCostAfterTax.calculate(0.013, 0.003)).toBe(0.01);
  });
  test('0.01999', () => {
    expect(TotalCostAfterTax.calculate(0.01999, 0)).toBe(0.01);
  });
  test('check MAX_SAFE_INTEGERs sum', () => {
    expect(TotalCostAfterTax.calculate(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(4 * Number.MAX_SAFE_INTEGER);
  });
  test('check MAX_SAFE_INTEGERs with mantisa .01 sum', () => {
    expect(TotalCostAfterTax.calculate(Number.MAX_SAFE_INTEGER + 0.01, Number.MAX_SAFE_INTEGER + 0.01, Number.MAX_SAFE_INTEGER + 0.01, Number.MAX_SAFE_INTEGER + 0.01)).toBe(4 * (Number.MAX_SAFE_INTEGER + 0.01));
  });
  test('empty', () => {
    expect(TotalCostAfterTax.calculate()).toBe(0);
  });
  test('Max safe integer, 1', () => {
    expect(TotalCostAfterTax.calculate(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
  });
  test('Pass number but String', () => {
    expect(TotalCostAfterTax.calculate('0.01999', '0')).toBe(0.01);
  });
  test('number + string', () => {
    expect(TotalCostAfterTax.calculate(0.01999, '0')).toBe(0.01);
  });
  test('NaN + number + number', () => {
    expect(TotalCostAfterTax.calculate('i am not a number', '0', 100.50)).toBe(100.5);
  });
  test('String(10.50) + String(10.50)', () => {
    expect(TotalCostAfterTax.calculate('10.50', '10.50')).toBe(21);
  });
});

describe('bad TotalCostAfterTax', () => {
  test('Pass not number', () => {
    expect(new TotalCostAfterTax('i am not number. Sorry').value).toBe('');
  });
});

describe('good TotalCostAfterTax', () => {
  test('Number(100)', () => {
    expect(new TotalCostAfterTax(100).value).toBe('100');
  });
  test('Number(100.005)', () => {
    expect(new TotalCostAfterTax(100.005).value).toBe('100');
  });
  test('Number(100.05)', () => {
    expect(new TotalCostAfterTax(100.05).value).toBe('100.05');
  });
  test('Number(100.059999)', () => {
    expect(new TotalCostAfterTax(100.059999).value).toBe('100.05');
  });
  test('String(100)', () => {
    expect(new TotalCostAfterTax('100').value).toBe('100');
  });
  test('String(100.005)', () => {
    expect(new TotalCostAfterTax('100.005').value).toBe('100');
  });
  test('String(100.05)', () => {
    expect(new TotalCostAfterTax('100.05').value).toBe('100.05');
  });
  test('String(100.059999)', () => {
    expect(new TotalCostAfterTax('100.059999').value).toBe('100.05');
  });
});
