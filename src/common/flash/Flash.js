import DisplayStrategyBase from './strategies/DisplayStrategyBase';
import withEvent from '../../utils/withEvent';

const singleton = Symbol('singleton');
const singletonEnforcer = Symbol('singletonEnforcer');

const _displayStrategy = Symbol('displayStrategy');

export const EVENT_ADD_INFO = 'DI_EVENT_FLASH_ADD_INFO';
export const EVENT_ADD_ERROR = 'DI_EVENT_FLASH_ADD_ERROR';
export const EVENT_ADD_SUCCESS = 'DI_EVENT_FLASH_ADD_SUCCESS';

class BaseFlash {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Это синглтон. Вместо оператора new используйте Flash.gi()');
    }
  }
  static gi() {
    if (!this[singleton]) {
      this[singleton] = withEvent(new BaseFlash(singletonEnforcer));
    }
    return this[singleton];
  }
  checkDisplayStrategy() {
    if (!this.displayStrategy) {
      throw new Error('Необходимо задать стратегию отображения.');
    }
  }
  error(err) {
    this.checkDisplayStrategy();
    this.dispatch(EVENT_ADD_ERROR, err);
  }
  success(msg) {
    this.checkDisplayStrategy();
    this.dispatch(EVENT_ADD_SUCCESS, msg);
  }
  info(msg) {
    this.checkDisplayStrategy();
    this.dispatch(EVENT_ADD_INFO, msg);
  }
  set displayStrategy(strategy) {
    if (!strategy instanceof DisplayStrategyBase) {
      throw new Error('Стратегия отображения должна быть подклассом DisplayStrategyBase');
    }
    this[_displayStrategy] = strategy;
  }
  get displayStrategy() {
    return this[_displayStrategy];
  }
}

const Flash = BaseFlash.gi();

export { Flash };

export default Flash;
