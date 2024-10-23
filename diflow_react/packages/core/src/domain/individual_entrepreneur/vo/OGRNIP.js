/*
  ОГРНИП(Основной Государственный Регистрационный Номер Индивидуального Предпринимателя) состоит из 15 цифр
  Номер - уникальный

  С Г Г К К Н Н Х Х Х Х Х X X Ч

  С (1-й знак) — признак отнесения государственного регистрационного номера записи:
    к ОГРНИП - "3";
    к иному государственному регистрационному номеру записи - 4;

  ГГ (со 2-го по 3-й знак) — две последние цифры года внесения записи в государственный реестр

  КК (4-й, 5-й знаки) — порядковый номер субъекта Российской Федерации

  НН (с 6-го по 7-й знак) — код налоговой инспекции
  ХХХХХXX (с 8-го по 14-й знак) — номер записи, внесенной в государственный реестр в течение года
  Ч (15-й знак) — контрольное число
*/
class OGRNIP {
  static get REG_EXP() {
    return new RegExp('^[0-9][0-9]{2}[0-9]{2}[0-9]{2}[0-9]{7}[0-9]$');
  }

  static validate(ogrnip) {
    if (ogrnip.length === 15) {
      const n15 = parseInt((parseInt(ogrnip.slice(0, -1), 10) % 13).toString().slice(-1), 10);
      if (n15 !== parseInt(ogrnip[14], 10)) return 'Неправильное контрольное число';
    }
    return OGRNIP.REG_EXP.test(ogrnip) ? undefined : 'Введите номер длиной 15 знаков';
  }

  static isValid(value) {
    return !OGRNIP.validate(value);
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 15);
  }

  static get placeholder() {
    return 'Введите ОГРНИП';
  }

  static get hint() {
    return 'Введите 15-значный код';
  }

  static get name() {
    return 'ОГРНИП';
  }

  static get field() {
    return 'ogrn';
  }

  constructor(ogrnip) {
    if (!OGRNIP.isValid(`${ogrnip}`)) {
      this._error = new Error('Невозможно создать ОГРНИП. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${ogrnip}`;
  }

  clone() {
    return new OGRNIP(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default OGRNIP;
