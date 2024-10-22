import City from './City';

describe('city domain', () => {
  test('mask trim', () => {
    expect(City.mask('   city   ')).toBe('city   ');
  });
});
