/*
  СортТов - Сорт товара
  T(1-10)
*/

class Sort {
  static get REG_EXP() {
    return new RegExp('^.{0,10}$');
  }

  static validate(value) {
    return value && !Sort.REG_EXP.test(value) ? 'Введите сорт товара (до 10 символов)' : undefined;
  }

  static isValid(value) {
    return !Sort.validate(value);
  }

  static get hint() {
    return 'Введите сорт товара (до 10 символов)';
  }

  static get placeholder() {
    return 'Введите сорт товара';
  }

  static get name() {
    return 'Сорт товара';
  }

  static get field() {
    return 'sort';
  }


  constructor(code) {
    if (!Sort.isValid(`${code}`)) {
      this._error = new Error('Невозможно создать сорт товара. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${code}`;
  }

  clone() {
    return new Sort(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Sort;
