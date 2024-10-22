import Building from './Building';

describe('building domain', () => {
  test('mask trim', () => {
    expect(Building.mask('   building   ')).toBe('building   ');
  });
  test('only spaces', () => {
    expect(Building.mask('   ')).toBe('');
  });
});
