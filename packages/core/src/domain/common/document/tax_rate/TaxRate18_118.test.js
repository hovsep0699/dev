import TaxRate18_118 from './TaxRate18_118';

describe('calculate', () => {
  test('number: 50', () => {
    expect(TaxRate18_118.calculate(50)).toBe(7.62);
  });
  test('string: 50', () => {
    expect(TaxRate18_118.calculate('50')).toBe(7.62);
  });
  test('10.6', () => {
    expect(TaxRate18_118.calculate(10.6)).toBe(1.61);
  });
  test('0.6', () => {
    expect(TaxRate18_118.calculate(0.6)).toBe(0.09);
  });
  test('0.5', () => {
    expect(TaxRate18_118.calculate(0.5)).toBe(0.07);
  });
  test('0.4', () => {
    expect(TaxRate18_118.calculate(0.4)).toBe(0.06);
  });
  test('0.04', () => {
    expect(TaxRate18_118.calculate(0.04)).toBe(0);
  });
  test('0.009', () => {
    expect(TaxRate18_118.calculate(0.009)).toBe(0);
  });
  test('0', () => {
    expect(TaxRate18_118.calculate('0')).toBe(0);
  });
  test('0.00', () => {
    expect(TaxRate18_118.calculate('0.00')).toBe(0);
  });
  test('empty', () => {
    expect(TaxRate18_118.calculate()).toBe(0);
  });
  test('not a number', () => {
    expect(TaxRate18_118.calculate('im not a number')).toBe(0);
  });
});
