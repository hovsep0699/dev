/*
  ОГРН(Основной Государственный Регистрационный Номер) состоит из 13 цифр
  Номер - уникальный

  С Г Г К К Н Н Х Х Х Х Х Ч

  С (1-й знак) — признак отнесения государственного регистрационного номера записи:
    к основному государственному регистрационному номеру (ОГРН)* — 1, 5 (присваивается юридическому лицу)
    к иному государственному регистрационному номеру записи ЕГРЮЛ* (ГРН) — 2, 6, 7, 8, 9
    к иному государственному регистрационному номеру записи ЕГРИП* (ГРНИП) — 4

  ГГ (со 2-го по 3-й знак) — две последние цифры года внесения записи в государственный реестр
  КК (4-й, 5-й знаки) — порядковый номер субъекта Российской Федерации
  НН (с 6-го по 7-й знак) — код налоговой инспекции
  ХХХХХ (с 8-го по 12-й знак) — номер записи, внесенной в государственный реестр в течение года
  Ч (13-й знак) — контрольное число
*/
class OGRN {
  static get REG_EXP() {
    return new RegExp('^[0-9][0-9]{2}[0-9]{2}[0-9]{2}[0-9]{5}[0-9]$');
  }

  static validate(ogrn) {
    if (ogrn.length === 13) {
      const n13 = parseInt((parseInt(ogrn.slice(0, -1), 10) % 11).toString().slice(-1), 10);
      if (n13 !== parseInt(ogrn[12], 10)) return 'Неправильное контрольное число';
    }
    return OGRN.REG_EXP.test(ogrn) ? undefined : 'Введите номер длиной 13 знаков';
  }

  static isValid(value) {
    return !OGRN.validate(value);
  }

  static mask(value) {
    return value && value.replace(/\D/g, '').slice(0, 13);
  }

  static get placeholder() {
    return 'Введите ОГРН';
  }

  static get hint() {
    return 'Введите 13-значный код';
  }

  static get name() {
    return 'ОГРН';
  }

  static get field() {
    return 'ogrn';
  }

  constructor(ogrn) {
    if (!OGRN.isValid(`${ogrn}`)) {
      this._error = new Error('Невозможно создать ОГРН. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${ogrn}`;
  }

  clone() {
    return new OGRN(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default OGRN;
