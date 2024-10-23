import Code from './Code';

class Measurement {
  static validate(value) {
    return !value ? 'Выберите значение из списка' : undefined;
  }

  static isValid(value) {
    return !Measurement.validate(value);
  }

  static get hint() {
    return 'Начните вводить название единицы измерения и выберите его из выпадающего списка';
  }

  static get placeholder() {
    return '-';
  }

  static get name() {
    return 'Единица измерения';
  }

  static get field() {
    return 'measurement';
  }

  static get VOs() {
    return [Code];
  }

  static get type() {
    return 'autocomplete';
  }

  constructor({
    id,
    code,
    title,
    local_designation
  }) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.localDesignation = local_designation;
  }

  clone() {
    return new Measurement({
      id: this._id,
      code: this.code,
      title: this._title,
      local_designation: this.localDesignation
    });
  }

  get value() {
    return {
      [Code.field]: this.code,
      id: this.id,
      title: this.title,
      localDesignation: this.localDesignation,
    };
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

  get localDesignation() {
    return this._localDesignation;
  }

  set localDesignation(value) {
    this._localDesignation = value;
  }
}

export default Measurement;
