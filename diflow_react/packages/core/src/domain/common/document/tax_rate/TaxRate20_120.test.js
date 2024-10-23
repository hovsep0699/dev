import TaxRate20_120 from './TaxRate20_120';

describe('calculate', () => {
  test('number: 50', () => {
    expect(TaxRate20_120.calculate(50)).toBe(8.33);
  });
  test('string: 50', () => {
    expect(TaxRate20_120.calculate('50')).toBe(8.33);
  });
  test('10.6', () => {
    expect(TaxRate20_120.calculate(10.6)).toBe(1.76);
  });
  test('0.6', () => {
    expect(TaxRate20_120.calculate(0.6)).toBe(0.1);
  });
  test('0.4', () => {
    expect(TaxRate20_120.calculate(0.4)).toBe(0.06);
  });
  test('0.5', () => {
    expect(TaxRate20_120.calculate(0.5)).toBe(0.08);
  });
  test('0.04', () => {
    expect(TaxRate20_120.calculate(0.04)).toBe(0);
  });
  test('0.009', () => {
    expect(TaxRate20_120.calculate(0.009)).toBe(0);
  });
  test('0', () => {
    expect(TaxRate20_120.calculate('0')).toBe(0);
  });
  test('0.00', () => {
    expect(TaxRate20_120.calculate('0.00')).toBe(0);
  });
  test('empty', () => {
    expect(TaxRate20_120.calculate()).toBe(0);
  });
  test('not a number', () => {
    expect(TaxRate20_120.calculate('im not a number')).toBe(0);
  });
});
