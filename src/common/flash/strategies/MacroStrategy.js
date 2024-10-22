import React from 'react';
import DisplayStrategyBase from './DisplayStrategyBase';

const _strategies = Symbol('strategies');

class MacroStrategy extends DisplayStrategyBase {
  constructor(strategies) {
    super();
    if (!Array.isArray(strategies)) {
      throw new Error('Параметр должен быть массивом');
    }
    strategies.forEach((strategy, index) => {
      if (!strategy instanceof DisplayStrategyBase) {
        throw new Error(`Элемент [${index}] должен быть подклассом DisplayStrategy`);
      }
    });
    this[_strategies] = strategies;
  }
  displayStrategy(strategyType, arg) {
    let msgComponent;
    this[_strategies].forEach(strategy => {
      let item = strategy[strategyType](arg);
      if (React.isValidElement(item)) {
        msgComponent = item;
      }
    });
    return msgComponent;
  }
  displayError(arg) {
    return this.displayStrategy('displayError', arg);
  }
  displayInfo(arg) {
    return this.displayStrategy('displayInfo', arg);
  }
  displaySuccess(arg) {
    return this.displayStrategy('displaySuccess', arg);
  }
}

export default MacroStrategy;
