/*
  ДатаПРД (Дата платежно-расчетного документа)

  XML:
  <СвПРД СуммаПРД="9999" НомерПРД="К платёжному документу4" ДатаПРД="23.09.2019"/>

  date (Date for Payment Document)
*/
import DateType from '../../../standard_element/date/DateType';

class DatePD {
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

  static get type() {
    return 'date';
  }

  constructor(date) {
    if (!DatePD.isValid(`${date}`)) {
      this._error = new Error('Невозможно создать ДатаПРД (Дата платежно-расчетного документа). Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${date}`;
  }

  clone() {
    return new DatePD(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default DatePD;
