/*
  КодОКВ - код Общероссийского Классификатора Валют
  Трёхзначный цифровой код валюты
  КодОКВ в xml
 <СвСчФакт НомерСчФ="1НОМЕР ДОКУМЕНТА" ДатаСчФ="26.09.2019" КодОКВ="643">
*/

class Code {
  static get REG_EXP() {
    return new RegExp('^[0-9]{3}$');
  }

  static validate(value) {
    return !Code.REG_EXP.test(value) ? 'Введите код валюты' : undefined;
  }

  static isValid(value) {
    return !Code.validate(value);
  }

  constructor(code) {
    if (!Code.isValid(`${code}`)) {
      this._error = new Error('Невозможно создать цифровой код валюты. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${code}`;
  }

  clone() {
    return new Code(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Code;
