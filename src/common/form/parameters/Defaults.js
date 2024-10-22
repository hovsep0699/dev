import { assert } from 'chai';
import Behavior from './Behavior';
import Appearance from './Appearance';
import autobind from 'autobind-decorator';

class Defaults {
  constructor(defaultBehavior, defaultAppearance) {
    this._defaultBehavior = defaultBehavior;
    this._defaultAppearance = defaultAppearance;
  }

  get behavior() {
    return this._defaultBehavior;
  }

  get appearance() {
    return this._defaultAppearance;
  }
  @autobind
  handleBehavior(behavior) {
    if (behavior === undefined) return this._defaultBehavior;
    assert.instanceOf(behavior, Behavior);
    return behavior;
  }
  @autobind
  handleAppearance(appearance) {
    if (appearance === undefined) return this._defaultAppearance;
    assert.instanceOf(appearance, Appearance);
    return appearance;
  }
}

export default Defaults;
