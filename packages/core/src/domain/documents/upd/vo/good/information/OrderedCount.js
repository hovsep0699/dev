/*
 НадлОтп - Заказанное количество (количество надлежит отпустить)
*/
class OrderedCount {
  static get REG_EXP() {
    return new RegExp('^[0-9]{1,26}(.[0-9]{1,11})?$');
  }

  static validate(value) {
    return value && !OrderedCount.REG_EXP.test(value) ? 'Введите число длиной до 26 знаков' : undefined;
  }

  static isValid(value) {
    return !OrderedCount.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return '';
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get hint() {
    return 'Введите отпускаемое количество';
  }

  static get placeholder() {
    return 'Введите количество';
  }

  static get name() {
    return 'Отпускаемое количество';
  }

  static get field() {
    return 'orderedCount';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default OrderedCount;
