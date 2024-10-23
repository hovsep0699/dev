/*
  КодКат - код каталога
  T(=27)
*/

class CatalogCode {
  static get REG_EXP() {
    return new RegExp('^.{27}$');
  }

  static validate(value) {
    return value && !CatalogCode.REG_EXP.test(value) ? 'Введите код каталога (27 символов)' : undefined;
  }

  static isValid(value) {
    return !CatalogCode.validate(value);
  }

  static get hint() {
    return 'Введите код каталога (27 символов)';
  }

  static get placeholder() {
    return 'Введите код каталога';
  }

  static get name() {
    return 'Код каталога';
  }

  static get field() {
    return 'catalogCode';
  }

  constructor(code) {
    if (!CatalogCode.isValid(`${code}`)) {
      this._error = new Error('Невозможно создать код каталога. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${code}`;
  }

  clone() {
    return new CatalogCode(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default CatalogCode;
