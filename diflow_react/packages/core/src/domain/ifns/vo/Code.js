/*
  код налогового органа состоит из 4 цифр
  (1—2-я цифры) код субъекта Российской Федерации
  (3—4-я цифры) номер инспекции
*/
// TODO очень плохо. В domain просочились вышестоящие уровни архитектуры
import Environment from '../../../application/Environment';

class Code {
  static get REG_EXP() {
    return new RegExp('^[0-9]{2}[0-9]{2}$');
  }

  static validate(value) {
    return Code.REG_EXP.test(value) ? undefined : 'Введите код длиной 4 знака';
  }

  static isValid(value) {
    return !Code.validate(value);
  }

  static get hint() {
    return 'Начните вводить «Код налогового органа» и выберите его из выпадающего списка';
  }

  static get placeholder() {
    return 'Введите код';
  }

  static get name() {
    return 'Код налогового органа';
  }

  static get field() {
    return 'ifns';
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 4);
  }

  constructor(code) {
    if (!Code.isValid(`${code}`)) {
      throw new Error('Невозможно создать «Код налогового органа». Формат не верен.');
    }
    this._value = `${code}`;
  }

  clone() {
    return new Code(this.value);
  }

  get value() {
    return this._value;
  }
}

export default Code;
