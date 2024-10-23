/*
  Количество товара в единицах измерения прослеживаемого товара (КолВЕдПрослеж)
*/
class MeasurementValue {
  static get REG_EXP() {
    return new RegExp('^[0-9]{1,26}(.[0-9]{1,11})?$');
  }

  static validate(value) {
    return !value || !MeasurementValue.REG_EXP.test(value) ? 'Введите число длиной до 26 знаков' : undefined;
  }

  static isValid(value) {
    return !MeasurementValue.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return '';
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get hint() {
    return 'Введите число длиной до 26 знаков';
  }

  static get placeholder() {
    return 'Введите количество';
  }

  static get name() {
    return 'Кол-во';
  }

  static get field() {
    return 'measurementValue';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default MeasurementValue;
