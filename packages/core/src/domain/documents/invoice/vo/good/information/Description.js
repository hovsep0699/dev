/*
  ХарактерТов - Характеристика/описание товара
  T(1-1000)
*/

class Description {
  static get REG_EXP() {
    return new RegExp('^.{0,1000}$');
  }

  static validate(value) {
    return value && !Description.REG_EXP.test(value) ? 'Введите характеристику товара' : undefined;
  }

  static isValid(value) {
    return !Description.validate(value);
  }

  static get hint() {
    return 'Введите характеристики/описание товара';
  }

  static get placeholder() {
    return 'Введите характеристики';
  }

  static get name() {
    return 'Характеристика';
  }

  static get field() {
    return 'description';
  }

  constructor(code) {
    if (!Description.isValid(`${code}`)) {
      this._error = new Error('Невозможно создать характеристику товара. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${code}`;
  }

  clone() {
    return new Description(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Description;
