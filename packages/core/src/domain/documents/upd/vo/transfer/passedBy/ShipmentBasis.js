/*
  Основание, по которому организации доверена отгрузка товаров (передача результатов работ), передача имущественных прав (предъявление оказанных услуг)
   ОснДовОргПер A(атрибут) текст(1-120)
 */
class ShipmentBasis {
  static get REG_EXP() {
    return new RegExp('^.{1,120}$');
  }

  static validate(value) {
    return value && !ShipmentBasis.REG_EXP.test(value) ? 'Введите строку длиной 1-120 знаков' : undefined;
  }

  static isValid(value) {
    return !ShipmentBasis.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 120);
  }

  static get placeholder() {
    return 'Введите доверенность';
  }

  static get hint() {
    return 'Введите строку длиной до 120 знаков';
  }

  static get name() {
    return 'Доверенность';
  }

  static get field() {
    return 'shipmentBasis';
  }

  constructor(value) {
    if (!ShipmentBasis.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Доверенность. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new ShipmentBasis(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default ShipmentBasis;
