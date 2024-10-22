import House from './House';

describe('house domain', () => {
  test('mask trim', () => {
    expect(House.mask('   house   ')).toBe('house   ');
  });
});
