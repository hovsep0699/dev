/*
  Дата документа - основания (ДатаОсн)
 */
import DateType from '../date/DateType';

class DocDate {
  static validate(value) {
    if (value) {
      return DateType.validate(value);
    }
    return undefined;
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

  constructor(value) {
    if (!DocDate.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать "Дата документа - основания". Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new DocDate(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default DocDate;
