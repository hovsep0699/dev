/*
  ДатаТип
*/
import { parse } from 'date-fns';
import { assert } from 'chai';

class DateType {
  static validate(value) {
    try {
      assert.exists(value, 'Параметр не должен быть пустым');
      assert.equal(value.length, 10, 'Должно быть 10 символов в дате xx.xx.xxxx');
      const res = parse(value, 'dd.MM.yyyy', new Date()).toString();
      assert.notEqual(res, 'Invalid Date');
      return undefined;
    } catch (error) {
      return 'Введите дату в формате dd.mm.yyyy';
    }
  }

  static isValid(value) {
    return !DateType.validate(value);
  }

  static get placeholder() {
    return 'Дата';
  }

  static get hint() {
    return 'Введите дату в формате dd.mm.yyyy';
  }

  static get name() {
    return 'Дата';
  }

  static get field() {
    return 'date';
  }

  constructor(date) {
    if (!DateType.isValid(`${date}`)) {
      this._error = new Error('Невозможно создать дату. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${date}`;
  }

  clone() {
    return new DateType(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default DateType;
