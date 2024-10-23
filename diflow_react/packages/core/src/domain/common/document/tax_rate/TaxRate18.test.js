import TaxRate18 from './TaxRate18';

describe('calculate', () => {
  test('number: 50', () => {
    expect(TaxRate18.calculate(50)).toBe(9);
  });
  test('string: 50', () => {
    expect(TaxRate18.calculate('50')).toBe(9);
  });
  test('10.6', () => {
    expect(TaxRate18.calculate(10.6)).toBe(1.9);
  });
  test('0.6', () => {
    expect(TaxRate18.calculate(0.6)).toBe(0.1);
  });
  test('0.5', () => {
    expect(TaxRate18.calculate(0.5)).toBe(0.09);
  });
  test('0.4', () => {
    expect(TaxRate18.calculate(0.4)).toBe(0.07);
  });
  test('0.04', () => {
    expect(TaxRate18.calculate(0.04)).toBe(0);
  });
  test('0.009', () => {
    expect(TaxRate18.calculate(0.009)).toBe(0);
  });
  test('0', () => {
    expect(TaxRate18.calculate('0')).toBe(0);
  });
  test('0.00', () => {
    expect(TaxRate18.calculate('0.00')).toBe(0);
  });
  test('empty', () => {
    expect(TaxRate18.calculate()).toBe(0);
  });
  test('not a number', () => {
    expect(TaxRate18.calculate('im not a number')).toBe(0);
  });
});
