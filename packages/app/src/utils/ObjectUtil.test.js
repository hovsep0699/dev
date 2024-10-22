import { removeEmpty } from './ObjectUtil';

describe('removeEmpty', () => {
  const objWithUndefined = {
    one: 'one',
    two: {
      twoone: undefined,
      twotwo: undefined,
      twothree: {
        three: undefined
      }
    }
  };
  const objWithNull = {
    one: 'one',
    two: {
      twoone: null,
      twotwo: null,
      twothree: {
        three: null
      }
    }
  };
  const objWithEmptyStrings = {
    one: 'one',
    two: {
      twoone: '',
      twotwo: '',
      twothree: {
        three: ''
      }
    }
  };
  const objWithThreeLayers = {
    one: 'one',
    two: {
      twoone: 'twoone',
      twotwo: {
        twotwoone: 'smth',
        twotwotwo: ''
      },
      twothree: ''
    }
  };
  const resWithThreeLayers = {
    one: 'one',
    two: {
      twoone: 'twoone',
      twotwo: {
        twotwoone: 'smth'
      }
    }
  };
  it('undefined vals', () => {
    expect(removeEmpty(objWithUndefined)).toEqual({ one: 'one' });
  });
  it('null vals', () => {
    expect(removeEmpty(objWithNull)).toEqual({ one: 'one' });
  });
  it('empty string vals', () => {
    expect(removeEmpty(objWithEmptyStrings)).toEqual({ one: 'one' });
  });
  it('three layers', () => {
    expect(removeEmpty(objWithThreeLayers)).toEqual(resWithThreeLayers);
  });
});
