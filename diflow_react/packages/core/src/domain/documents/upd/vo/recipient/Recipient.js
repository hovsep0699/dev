import Division from './Division';

class Recipient {
  static validate(value) {
    return !value ? 'Введите название, ИНН или ОГРН компании покупателя' : undefined;
  }

  static isValid(value) {
    return !Recipient.validate(value);
  }

  static get hint() {
    return 'Начните вводить название компании и выберите его из выпадающего списка';
  }

  static get placeholder() {
    return 'Введите покупателя';
  }

  static get name() {
    return 'Покупатель';
  }

  static get field() {
    return 'recipient';
  }

  constructor({
    id,
    isActive,
    title,
    type
  }) {
    this.id = id;
    this.isActive = isActive;
    this.title = title;
    this.type = type;
    this.division = id;
  }

  clone() {
    return new Recipient({
      id: this.id,
      isActive: this.isActive,
      title: this.title,
      type: this.type
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

  get isActive() {
    return this._isActive;
  }

  set isActive(value) {
    this._isActive = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get division() {
    return this._division;
  }

  set division(id) {
    this._division = new Division(id);
  }
}

export default Recipient;
