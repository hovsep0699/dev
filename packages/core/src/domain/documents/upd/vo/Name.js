//Наименование первичного документа, определенное организацией (согласованное сторонами сделки).

//#НаимДокОпр

class Name {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !Name.REG_EXP.test(value) ? 'Введите строку длиной 1-255' : undefined;
  }

  static isValid(value) {
    return !Name.validate(value);
  }

  static get hint() {
    return 'Введите наименование первичного документа';
  }

  static get placeholder() {
    return 'Введите наименование документа';
  }

  static get name() {
    return 'Наименование первичного документа';
  }

  static get field() {
    return 'name';
  }

  constructor(title) {
    this.title = title;
  }

  clone() {
    return new Name(this.title);
  }

  get value() {
    return this._title;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }
}

export default Name;
