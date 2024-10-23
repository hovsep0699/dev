/*
  Идентификатор документа - основания (ИдентОсн), текст(1-255)
 */
class DocId {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !DocId.REG_EXP.test(value) ? 'Введите строку длиной 1–255 знаков' : undefined;
  }

  static isValid(value) {
    return !DocId.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 255);
  }

  static get placeholder() {
    return 'Введите идентификатор';
  }

  static get hint() {
    return 'Введите строку длиной 1-255 знаков';
  }

  static get name() {
    return 'Идентификатор документа';
  }

  static get field() {
    return 'identifier';
  }

  constructor(value) {
    if (!DocId.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать "Идентификатор документа - основания". Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new DocId(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default DocId;
