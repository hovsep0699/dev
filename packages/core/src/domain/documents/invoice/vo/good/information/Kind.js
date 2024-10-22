/*
 ПрТовРаб - Признак Товар/Работа/Услуга/Право/Иное
 */

import Property from './kind/Property';
import Work from './kind/Work';
import Service from './kind/Service';
import PropertyRights from './kind/PropertyRights';
import Other from './kind/Other';

class Kind {
  static get options() {
    return [Property, Work, Service, PropertyRights, Other];
  }

  static validate(value) {
    return Kind.options.some(option => option.value === value) ? undefined : 'Неверный тип признака товара';
  }

  static isValid(value) {
    return !Kind.validate(value);
  }

  static get hint() {
    return 'Выберите признак';
  }

  static get placeholder() {
    return 'Выберите признак';
  }

  static get name() {
    return 'Признак';
  }

  static get field() {
    return 'kind';
  }

  constructor(purpose) {
    if (!Kind.isValid(purpose)) {
      this._error = new Error('Невозможно создать Признак товара. Значение невалидно.');
    } else {
      this._error = null;
    }
    this._value = purpose;
    this._title = this.getTitleByValue(purpose);
  }

  getTitleByValue(value) {
    const options = [...Kind.options];
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) return options[i].title;
    }
    return undefined;
  }

  clone() {
    return new Kind(this.value);
  }

  get value() {
    return this._value;
  }

  get title() {
    return this._title;
  }

  get error() {
    return this._error;
  }
}

export default Kind;
