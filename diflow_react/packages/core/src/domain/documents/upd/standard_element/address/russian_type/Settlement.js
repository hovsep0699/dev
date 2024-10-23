/*
  Населенный пункт(НаселПункт) A(атрибут) текст(1-50)
 */
class Settlement {
  static get REG_EXP() {
    return new RegExp('^.{1,50}$');
  }

  static validate(value) {
    return value && !Settlement.REG_EXP.test(value) ? 'Введите строку длиной 1-50 знаков' : undefined;
  }

  static isValid(value) {
    return !Settlement.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 50);
  }

  static get placeholder() {
    return 'Введите название населённого пункта';
  }

  static get hint() {
    return 'Введите строку длиной до 50 знаков';
  }

  static get name() {
    return 'Населенный пункт';
  }

  static get field() {
    return 'settlement';
  }

  constructor(value) {
    if (!Settlement.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать населенный пункт. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Settlement(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Settlement;
