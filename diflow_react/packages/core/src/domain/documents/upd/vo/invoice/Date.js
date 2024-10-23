/*
  ДатаСчФ
   <СвСчФакт ДатаСчФ="26.09.2019">
*/
import DateType from '../../standard_element/date/DateType';

class DateInvoice {
  static validate(value) {
    return DateType.validate(value);
  }

  static isValid(value) {
    return !DateType.validate(value);
  }

  static get placeholder() {
    return DateType.placeholder;
  }

  static get hint() {
    return DateType.hint;
  }

  static get name() {
    return DateType.name;
  }

  static get field() {
    return DateType.field;
  }

  constructor(date) {
    if (!DateInvoice.isValid(`${date}`)) {
      this._error = new Error('Невозможно создать ДатаСчФ. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${date}`;
  }

  clone() {
    return new DateInvoice(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default DateInvoice;
