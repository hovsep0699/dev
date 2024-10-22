import Behavior from './Behavior';

describe('behavior mixin', () => {
  it('mixin initialFieldDomain', () => {
    const targetBehavior = new Behavior({ scope: 'hello' });
    const initialFieldDomain = {
      value: 'default value'
    };
    const distBehavior = Behavior.mixin(targetBehavior, { initialFieldDomain });
    expect(distBehavior.scope).toBe('hello');
    expect(distBehavior.initialFieldDomain.value).toBe('default value');
  });

  it('mixin onChange', () => {
    const targetBehavior = new Behavior({ scope: 'hello' });

    const distBehavior = Behavior.mixin(targetBehavior, { onChange: () => 'I am OK' });
    expect(distBehavior.scope).toBe('hello');
    expect(distBehavior.onChange()).toBe('I am OK');
  });

  it('check required', () => {
    const defaultTableFieldBehavior = new Behavior({ showErrorMsg: false });

    const result = Behavior.mixin(defaultTableFieldBehavior, { isRequired: true });
    expect(result.showErrorMsg).toBe(false);
    expect(result.isRequired).toBe(true);
  });
});
