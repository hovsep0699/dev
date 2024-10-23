import ULType from './ULType';
import IPType from './IPType';

class Type {
  static get name() {
    return 'Тип';
  }

  static get field() {
    return 'type';
  }

  static get options() {
    return [ULType, IPType];
  }

  static validate(value) {
    return Type.options.some(option => option.value === value) ? undefined : 'Неверный тип участника';
  }

  static isValid(value) {
    return !Type.validate(value);
  }

  constructor(value) {
    if (!Type.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать тип участника. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = value;
    this._title = this.getTitleByValue(value);
  }

  getTitleByValue(value) {
    const options = [...Type.options];
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) return options[i].title;
    }
    return undefined;
  }

  clone() {
    return new Type(this.value);
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

export default Type;
