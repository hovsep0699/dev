/*
  КодОКВ - код Общероссийского Классификатора Валют
*/

import Code from './currency/Code';
import LetterCode from './currency/LetterCode';

class Currency {
  static get initialValue() {
    return new Currency({
      digital_code: '643',
      title: 'Российский рубль',
      letter_code: 'RUB',
      id: 147
    });
  }

  static validate(value) {
    return !value ? 'Введите наименование валюты' : undefined;
  }

  static isValid(value) {
    return !Currency.validate(value);
  }

  static get hint() {
    return 'Начните вводить название валюты и выберите его из выпадающего списка';
  }

  static get placeholder() {
    return 'Введите валюту';
  }

  static get name() {
    return 'Валюта';
  }

  static get field() {
    return 'currency';
  }

  static get VOs() {
    return [Code, LetterCode];
  }

  constructor({
    digital_code,
    title,
    letter_code,
    id
  }) {
    this.code = digital_code;
    this.title = title;
    this.letterCode = letter_code;
    this.id = id;
  }

  clone() {
    return new Currency({
      digital_code: this.code,
      title: this._title,
      letter_code: this.letterCode,
      id: this._id
    });
  }

  get value() {
    return this._title;
  }

  get code() {
    return this._code;
  }

  set code(value) {
    this._code = new Code(value);
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get letterCode() {
    return this._letterCode;
  }

  set letterCode(value) {
    this._letterCode = new LetterCode(value);
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}

export default Currency;
