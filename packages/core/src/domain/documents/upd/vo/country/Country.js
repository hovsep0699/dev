import Code from './Code';

class Country {
  static validate(value) {
    return !value ? 'Введите название страны' : undefined;
  }

  static isValid(value) {
    return !Country.validate(value);
  }

  static get hint() {
    return 'Начните вводить название страны происхождения товара и выберите его из выпадающего списка';
  }

  static get placeholder() {
    return '-';
  }

  static get name() {
    return 'Страна происхождения';
  }

  static get field() {
    return 'country';
  }

  constructor({ id, code, title, full_title }) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.fullTitle = full_title;
  }

  clone() {
    return new Country({
      id: this.id,
      code: this.code,
      title: this.title,
      full_title: this.fullTitle
    });
  }

  get value() {
    return this._title;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get code() {
    return this._code;
  }

  set code(value) {
    this._code = new Code(value);
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get fullTitle() {
    return this._fullTitle;
  }

  set fullTitle(value) {
    this._fullTitle = value;
  }
}

export default Country;
