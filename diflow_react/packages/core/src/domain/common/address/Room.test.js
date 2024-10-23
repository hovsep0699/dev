import Room from './Room';

describe('room domain', () => {
  test('mask trim', () => {
    expect(Room.mask('   room   ')).toBe('room   ');
  });
  test('only spaces', () => {
    expect(Room.mask('   ')).toBe('');
  });
});
