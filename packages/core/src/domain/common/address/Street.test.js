import Street from './Street';

describe('street domain', () => {
  test('mask trim', () => {
    expect(Street.mask('   street   ')).toBe('street   ');
  });
  test('only spaces', () => {
    expect(Street.mask('   ')).toBe('');
  });
});
