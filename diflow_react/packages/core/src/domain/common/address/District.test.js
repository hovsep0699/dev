import District from './District';

describe('district domain', () => {
  test('mask trim', () => {
    expect(District.mask('   district   ')).toBe('district   ');
  });
  test('only spaces', () => {
    expect(District.mask('   ')).toBe('');
  });
});
