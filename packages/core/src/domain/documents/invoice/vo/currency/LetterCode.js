// Трёхзначный алфавитный код валюты (RUS, EUR, USD и т.д.)

class LetterCode {
  static get REG_EXP() {
    return new RegExp('^[A-Z]{3}$');
  }

  static isValid(value) {
    return LetterCode.REG_EXP.test(value);
  }

  constructor(code) {
    if (!LetterCode.isValid(`${code}`)) {
      this._error = new Error('Невозможно создать алфавитный код валюты. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${code}`;
  }

  clone() {
    return new LetterCode(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default LetterCode;
