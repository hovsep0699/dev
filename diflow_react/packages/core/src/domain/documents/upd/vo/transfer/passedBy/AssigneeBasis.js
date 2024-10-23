/*
  Основание полномочий представителя организации на принятие товаров (груза)
   ОснПолнПредПрин A(атрибут) текст(1-120)
 */
class AssigneeBasis {
  static get REG_EXP() {
    return new RegExp('^.{1,120}$');
  }

  static validate(value) {
    return value && !AssigneeBasis.REG_EXP.test(value) ? 'Введите строку длиной 1-120 знаков' : undefined;
  }

  static isValid(value) {
    return !AssigneeBasis.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 120);
  }

  static get placeholder() {
    return 'Введите основание полномочий';
  }

  static get hint() {
    return 'Введите строку длиной до 120 знаков';
  }

  static get name() {
    return 'Основание полномочий';
  }

  static get field() {
    return 'assigneeBasis';
  }

  constructor(value) {
    if (!AssigneeBasis.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Основание полномочий. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new AssigneeBasis(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default AssigneeBasis;
