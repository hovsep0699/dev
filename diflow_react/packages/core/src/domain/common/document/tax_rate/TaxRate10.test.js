import TaxRate10 from './TaxRate10';

describe('calculate', () => {
  test('number: 50', () => {
    expect(TaxRate10.calculate(50)).toBe(5);
  });
  test('string: 50', () => {
    expect(TaxRate10.calculate('50')).toBe(5);
  });
  test('10.6', () => {
    expect(TaxRate10.calculate(10.6)).toBe(1.06);
  });
  test('0.6', () => {
    expect(TaxRate10.calculate(0.6)).toBe(0.06);
  });
  test('0.5', () => {
    expect(TaxRate10.calculate(0.5)).toBe(0.05);
  });
  test('0.4', () => {
    expect(TaxRate10.calculate(0.4)).toBe(0.04);
  });
  test('0.04', () => {
    expect(TaxRate10.calculate(0.04)).toBe(0);
  });
  test('0.009', () => {
    expect(TaxRate10.calculate(0.009)).toBe(0);
  });
  test('0', () => {
    expect(TaxRate10.calculate('0')).toBe(0);
  });
  test('0.00', () => {
    expect(TaxRate10.calculate('0.00')).toBe(0);
  });
  test('empty', () => {
    expect(TaxRate10.calculate()).toBe(0);
  });
  test('not a number', () => {
    expect(TaxRate10.calculate('im not a number')).toBe(0);
  });
});
