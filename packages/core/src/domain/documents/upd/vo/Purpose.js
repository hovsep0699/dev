import Invoice from './purpose/Invoice';
import InvoiceWaybill from './purpose/InvoiceWaybill';
import Waybill from './purpose/Waybill';

class Purpose {
  static get name() {
    return 'Функция';
  }

  static get field() {
    return 'purpose';
  }

  static get options() {
    return [Invoice, InvoiceWaybill, Waybill];
  }

  static validate(value) {
    return Purpose.options.some(option => option.value === value) ? undefined : 'Неверный тип документа';
  }

  static isValid(value) {
    return !Purpose.validate(value);
  }

  constructor(purpose) {
    if (!Purpose.isValid(purpose)) {
      this._error = new Error('Невозможно создать Функцию документа. Значение невалидно.');
    } else {
      this._error = null;
    }
    this._value = purpose;
    this._title = this.getTitleByValue(purpose);
  }

  getTitleByValue(value) {
    const options = [...Purpose.options];
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) return options[i].title;
    }
    return undefined;
  }

  clone() {
    return new Purpose(this.value);
  }

  get value() {
    return this._value;
  }

  get title() {
    return this._title;
  }

  get error() {
    return this._error;
  }
}

export default Purpose;
