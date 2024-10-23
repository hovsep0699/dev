import DateType from '../../standard_element/date/DateType';

export class DateCorrect {
  constructor(date) {
    date = String(date);
    this._error = null;

    if (!DateType.isValid(date)) {
      this._error = new Error('Формат не верен.');
    }

    this._value = date;
  }

  static validate(value) {
    if (value) {
      return DateType.validate(value);
    }
    return;
  }

  static isValid(value) {
    return !DateCorrect.validate(value);
  }

  static get field() {
    return 'date';
  }

  static get placeholder() {
    return 'Введите дату исправления';
  }

  static get name() {
    return 'Дата исправления';
  }

  static get hint() {
    return DateType.hint;
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default DateCorrect;
