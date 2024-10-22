import Settlement from './Settlement';

describe('settlement domain', () => {
  test('mask trim', () => {
    expect(Settlement.mask('   settlement   ')).toBe('settlement   ');
  });
  test('only spaces', () => {
    expect(Settlement.mask('   ')).toBe('');
  });
});
