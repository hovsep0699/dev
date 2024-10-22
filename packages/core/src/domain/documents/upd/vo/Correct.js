import DateCorrect from './correct/Date';
import NumberCorrect from './correct/Number';

class Correct {
  constructor(number, date) {
    this.number = number;
    this.date = date;
  }

  static validate(values) {
    // TODO релизовать валидацию
    return;
  }

  static isValid(value) {
    return !Correct.validate(value);
  }

  set number(value) {
    this._number = new NumberCorrect(value);
  }

  set date(value) {
    this._date = new DateCorrect(value);
  }

  static get name() {
    return '';
  }

  static get field() {
    return 'invoice.correction';
  }

  static get VOs() {
    return [NumberCorrect, DateCorrect];
  }

  get number() {
    return this._number;
  }

  get date() {
    return this._date;
  }

  get value() {
    return {
      [NumberCorrect]: this.number,
      [DateCorrect]: this.date
    };
  }
}

export default Correct;
