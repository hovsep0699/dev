/*
  Наименование документа - основания (НаимОсн), текст(1-255)
 */
class DocName {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !DocName.REG_EXP.test(value) ? 'Введите строку длиной 1–255 знаков' : undefined;
  }

  static isValid(value) {
    return !DocName.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 255);
  }

  static get placeholder() {
    return 'Введите наименование';
  }

  static get hint() {
    return 'Введите строку длиной 1-255 знаков';
  }

  static get name() {
    return 'Наименование документа';
  }

  static get field() {
    return 'title';
  }

  constructor(value) {
    if (!DocName.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать "Наименование документа - основания". Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new DocName(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default DocName;
