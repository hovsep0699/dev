import SignStrategy from './SignStrategy';

describe('Test get certificates ', () => {
  test('abstract class', () => {
    const abstractStrategy = new SignStrategy();
    return expect(() => abstractStrategy.sign()).toThrowError('Invoke this method in subclass');
  });
});
