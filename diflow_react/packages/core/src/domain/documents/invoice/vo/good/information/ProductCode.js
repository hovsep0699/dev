/*
  КодТов - код товара
  T(1-100)
*/

class ProductCode {
  static get REG_EXP() {
    return new RegExp('^.{0,100}$');
  }

  static validate(value) {
    return value && !ProductCode.REG_EXP.test(value) ? 'Введите код товара (до 100 символов)' : undefined;
  }

  static isValid(value) {
    return !ProductCode.validate(value);
  }

  static get hint() {
    return 'Введите код товара (до 100 символов)';
  }

  static get placeholder() {
    return 'Введите код товара';
  }

  static get name() {
    return 'Код товара';
  }

  static get field() {
    return 'code';
  }


  constructor(code) {
    if (!ProductCode.isValid(`${code}`)) {
      this._error = new Error('Невозможно создать код товара. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${code}`;
  }

  clone() {
    return new ProductCode(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default ProductCode;
