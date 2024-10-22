import { removeSymbol, capitalize } from './StringUtil';

test('removeSymbol', () => {
  expect(removeSymbol('ООО ""Рога и копыта""', '"')).toBe('ООО Рога и копыта');
  expect(removeSymbol("ООО 'Рога и копыта'", "'")).toBe('ООО Рога и копыта');
});

test('capitalize', () => {
  expect(capitalize('рога и копыта')).toBe('Рога и копыта');
});
