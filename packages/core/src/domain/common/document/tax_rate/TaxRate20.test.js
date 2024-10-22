import TaxRate20 from './TaxRate20';

describe('calculate', () => {
  test('number: 50', () => {
    expect(TaxRate20.calculate(50)).toBe(10);
  });
  test('string: 50', () => {
    expect(TaxRate20.calculate('50')).toBe(10);
  });
  test('10.6', () => {
    expect(TaxRate20.calculate(10.6)).toBe(2.12);
  });
  test('0.6', () => {
    expect(TaxRate20.calculate(0.6)).toBe(0.12);
  });
  test('0.5', () => {
    expect(TaxRate20.calculate(0.5)).toBe(0.1);
  });
  test('0.4', () => {
    expect(TaxRate20.calculate(0.4)).toBe(0.08);
  });
  test('0.04', () => {
    expect(TaxRate20.calculate(0.04)).toBe(0);
  });
  test('0.009', () => {
    expect(TaxRate20.calculate(0.009)).toBe(0);
  });
  test('empty', () => {
    expect(TaxRate20.calculate()).toBe(0);
  });
});
